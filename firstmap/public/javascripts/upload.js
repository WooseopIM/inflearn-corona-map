const mapContainer = document.getElementById("map");
const mapOption = {
  center: new daum.maps.LatLng(37.554477, 126.970419),
  level: 3,
};

let map = new daum.maps.Map(mapContainer, mapOption);

/* 인포 윈도우 */
let infowindow = new daum.maps.InfoWindow({
  zIndex: 1, // 지도 보다 인포 윈도우가 위에 띄워지도록 설정
});

let markerList = [];

/* 키워드 검색 */
let ps = new daum.maps.services.Places();

searchPlaces(); // keywords를 받고 검색하는 함수

function searchPlaces() {
  /* 
    함수를 위에서 먼저 호출하고 밑에 작성하는 이유 
    Arrow Function(화살표 함수)로 만든다면 함수 정의가 먼저 되어야 한다.
    여기서는 ES6+ 최신 문법인 화살표 함수보다 기존 function 문법을 사용해본다.
  */

  let keyword = $("#keyword").val(); // jQuery 문법: id가 keyword인 태그 안의 텍스트 값 리턴
  ps.keywordSearch(keyword, placesSearchCallBack); // ps 객체가 갖고 있는 keywordSearch 함수를 실행하고, 인자로 받은 keyword를 바탕으로 검색을 한 후, 검색 결과를 PlacesSerchCallBack이라는 함수를 통해 콜백
}

function placesSearchCallBack(data, status) {
  // 파라미터의미 -> data: 검색한 결과값, status: 결과값을 반환에 관한 서버의 상태
  if (status === daum.maps.services.Status.OK) {
    displayPlaces(data);
  } else if (status === daum.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === daum.maps.services.Status.ERROR) {
    alert("검색 결과중 오류가 발생했습니다.");
    return;
  }
}

function displayPlaces(data) {
  let listEl = document.getElementById("placesList");
  let bounds = new daum.maps.LatLngBounds(); // 지도 검색 후 해당 지점으로 이동, 마커들의 영역 계산

  // 검색 결과 초기화
  removeAllChildNodes(listEl);
  removeMarker();

  for (let i = 0; i < data.length; i++) {
    let lat = data[i].y;
    let lng = data[i].x;
    let address_name = data[i]["address_name"];
    let place_name = data[i]["place_name"];

    const placePosition = new daum.maps.LatLng(lat, lng);
    bounds.extend(placePosition);

    let marker = new daum.maps.Marker({
      position: placePosition,
    });

    marker.setMap(map);
    markerList.push(marker);

    const el = document.createElement("div");
    const itemStr = `
      <div class="info">
        <div class="info_title">
          ${place_name}
        </div>
        <span>${address_name}</span>
      </div>
    `;

    el.innerHTML = itemStr;
    el.className = "item";

    /* 
      마커를 클릭했을 때 인포 윈도우 생성, 
      맵을 클릭했을 때 인포 윈도우 닫기, 
      결과값을 클릭했을 때도 인포 윈도우가 열리고 닫혀야 함
    */

    daum.maps.event.addListener(marker, "click", function () {
      // 인포 윈도우 생성
      displayInfowindow(marker, place_name, address_name, lat, lng);
    });

    daum.maps.event.addListener(map, "click", function () {
      infowindow.close();
    });

    el.onclick = function () {
      displayInfowindow(marker, place_name, address_name, lat, lng);
    };

    listEl.appendChild(el); // 결과값이 검색창 안에 만들어진다.
  }

  map.setBounds(bounds);
}

function displayInfowindow(marker, place_name, address_name, lat, lng) {
  let content = `
    <div style="padding: 25px;">
      ${place_name}<br>
      ${address_name}<br>
      <button onClick="onSubmit('${place_name}', '${address_name}', ${lat}, ${lng})">등록</button>
    </div>
  `;

  map.panTo(marker.getPosition());
  infowindow.setContent(content);
  infowindow.open(map, marker);
}

function removeAllChildNodes(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

function removeMarker() {
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].setMap(null);
  }
  markerList = [];
}

function onSubmit(title, desc, lat, lng) {
  // 서버에 데이터를 넘길 수 있도록 요청하는 jQuery 문법 중 Ajax
  $.ajax({
    url: "/location",
    data: { title, desc, lat, lng },
    type: "POST",
  })
    .done((response) => {
      // ajax 요청이 잘 마무리 되면 done() 실행
      console.log("데이터 요청 성공!");
      alert("성공!");
    })
    .fail((error) => {
      // ajax 요청이 실패하면 fail() 실행
      console.log("데이터 요청 실패");
    });
}
