var mapOptions = {
  center: new naver.maps.LatLng(36.37049682178313, 127.36128608273715),
  zoom: 10,
};

var map = new naver.maps.Map("map", mapOptions);

/* 
  마커에 대한 정보를 배열 형태로 넣어보기
  처음엔 임의로 넣어본 값들
  
  const data = [
    {
      title: "용산역",
      address: "용산",
      lat: 37.530030700096184,
      lng: 126.96484009170416,
    },
    {
      title: "서울역",
      address: "서울",
      lat: 37.55729213580176,
      lng: 126.96939750896465,
    },
  ];
*/

/* Mongo DB에 request 보내서 데이터 가져오기 */
$.ajax({
  url: "/location",
  type: "GET",
}).done((response) => {
  if (response.message !== "성공!") return;
  const data = response.data;

  let markerList = [];
  let infowindowList = [];

  const getClickHandler = (i) => () => {
    const marker = markerList[i];
    const infowindow = infowindowList[i];
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  };

  const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
  };

  for (let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    let marker = new naver.maps.Marker({
      map: map,
      position: latlng,
      icon: {
        content: `<div class="marker"></div>`,
        anchor: new naver.maps.Point(7.5, 7.5),
      },
    });

    const content = `
    <div class="infowindow_wrap">
      <div class="infowindow_title">${target.title}</div>
      <div class="infowindow_address">${target.desc}</div>
    </div>
  `;
    const infowindow = new naver.maps.InfoWindow({
      content: content,
      backgroundColor: "#00ff0000",
      borderColor: "#00ff0000",
      anchorSize: new naver.maps.Size(0, 0),
    });

    markerList.push(marker);
    infowindowList.push(infowindow);
  }

  /* i번째 마커를 클릭했을 때, 인포 윈도우를 생성하는 getClickHandler 함수 실행 -> 만들어주기 */
  for (let i = 0, ii = markerList.length; i < ii; i++) {
    naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
    naver.maps.Event.addListener(map, "click", getClickMap(i));
  }

  /* 
    클러스터를 3개로 나누는 이유: 클러스터에 모이는 숫자에 맞게 클러스터 크기를 정해주기 위해 
    예: 마커가 10개 이하 -> class="cluster1"인 클러스터를 보여줌
        마커가 100개 이하 -> class="cluster2"인 클러스터를 보여줌
  */
  const cluster1 = {
    content: `<div class="cluster1"></div>`,
  };

  const cluster2 = {
    content: `<div class="cluster2"></div>`,
  };

  const cluster3 = {
    content: `<div class="cluster3"></div>`,
  };

  const markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 12,
    map: map,
    markers: markerList,
    disableClickZoom: false,
    gridSize: 100,
    icons: [cluster1, cluster2, cluster3],
    indexGernerator: [2, 5, 10], // 숫자에 맞게 클러스터가 생성되는 역할
    stylingFunction: (clusterMarker, count) => {
      // 클러스터 안에 몇 개의 마커가 들어가 있는지 시각적으로 확인할 수 있도록
      $(clusterMarker.getElement()).find("div:first-child").text(count);
    },
  });

  console.log(data);
  const createTable = (data) => {
    let table = document.getElementById("table-body");
    for (let i = 0; i < data.length; i++) {
      console.log(markerList[i]);
      let row = `
      <tr>
      <td>${data[i].title}</td>
      <td>${data[i].lat}</td>
      <td>${data[i].lng}</td>
      <td>${data[i].desc}</td>
      </tr>
      `;

      table.innerHTML += row;
    }
  };
  createTable(data);
});

/* 행정구역 구획 */

const urlPrefix = "https://navermaps.github.io/maps.js/docs/data/region";
const urlSuffix = ".json";

let regionGeoJson = [];
let loadCount = 0;

const tooltip = $(`<div style="position:absolute; z-index:1000; padding:5px 10px; background:white; border:1px solid black; font-size:14px; display:none; pointer-events:none;"></div>`);

tooltip.appendTo(map.getPanes().floatPane); // tooltip 지도 안에 넣기

naver.maps.Event.once(map, "init_stylemap", () => {
  for (let i = 1; i < 18; i++) {
    let keyword = i.toString();
    if (keyword.length === 1) {
      keyword = "0" + keyword;
    }

    $.ajax({
      url: urlPrefix + keyword + urlSuffix,
    }).done((geojson) => {
      regionGeoJson.push(geojson);
      loadCount++;
      if (loadCount === 17) {
        startDataLayer();
      }
    });
  }
});

function startDataLayer() {
  map.data.setStyle((feature) => {
    const styleOptions = {
      fillColor: "#ff0000",
      fillOpacity: 0.0001,
      strokeColor: "#ff0000",
      strokeWeight: 2,
      strokeOpacity: 0.4,
    };

    if (feature.getProperty("focus")) {
      styleOptions.fillOpacity = 0.6;
      styleOptions.fillColor = "#0f0";
      styleOptions.strokeColor = "#0f0";
      styleOptions.strokeWeight = 4;
      styleOptions.strokeOpaticy = 1;
    }

    return styleOptions;
  });

  regionGeoJson.forEach((geojson) => {
    map.data.addGeoJson(geojson);
  });

  map.data.addListener("click", (e) => {
    let feature = e.feature;
    if (feature.getProperty("focus") !== true) {
      // 클릭이 되어 있지 않을 때
      feature.setProperty("focus", true);
    } else {
      feature.setProperty("focus", false);
    }
  });

  /* 마우스 hover 이벤트 */
  map.data.addListener("mouseover", (e) => {
    let feature = e.feature;
    let regionName = feature.getProperty("area1");
    tooltip
      .css({
        display: "block",
        left: e.offset.x,
        top: e.offset.y,
      })
      .text(regionName);
    map.data.overrideStyle(feature, {
      fillOpacity: 0.6,
      strokeWeight: 4,
      strokeOpacity: 1,
    });
  });

  map.data.addListener("mouseout", (e) => {
    tooltip.hide().empty();
    map.data.revertStyle();
  });
}
