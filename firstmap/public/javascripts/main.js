var mapOptions = {
  center: new naver.maps.LatLng(37.3595704, 127.105399),
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
      <div class="infowindow_address">${target.address}</div>
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
});
