/* global kakao */
import React from "react";
import { useEffect } from "react";

const SelectPosition = () => {
  // let curLat = 37.365264512305174;
  // let curLng = 127.10676860117488;
  // let container = document.getElementById("map");
  // let options = {
  //   center: new kakao.maps.LatLng(curLat, curLng),
  //   level: 3,
  // };
  // let map = new kakao.maps.Map(container, options);
  // const displayMarker = (locPosition, message) => {
  //   let imageSize = new kakao.maps.Size(24, 35);
  //   let imageSrc = "assets/logo.png";
  //   let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  //   let curmarker = new kakao.maps.Marker({
  //     map: map,
  //     position: locPosition,
  //     image: markerImage,
  //   });
  //   let iwContent = message, //인포윈도우에 표시할 내용
  //     iwRemovealbe = true;
  //   //인포윈도우 생성
  //   let infowindow = new kakao.maps.InfoWindow({
  //     content: iwContent,
  //     removable: iwRemovealbe,
  //   });
  //   //인포윈도우를 마커위에 표시
  //   infowindow.open(map, curmarker);
  //   //지도 중심좌표를 접속위치로 변경
  //   map.setCenter(locPosition);
  // };
  // const currentLocation = () => {
  //   //HTML5의 geolocation으로 사용할 수 있는지 확인
  //   if (navigator.geolocation) {
  //     //GeoLocation을 이용해서 접속 위치 얻어오기.
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let lat = position.coords.latitude, //위도
  //         lng = position.coords.longitude; //경도
  //       let locPosition = new kakao.maps.LatLng(lat, lng);
  //       let message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시될 내용
  //       displayMarker(locPosition, message);
  //     });
  //   } else {
  //     let locPosition = new kakao.maps.LatLng(curLat, curLng),
  //       message = "현재 위치를 알 수 없어 기본 위치로 이동합니다.";
  //     currentLatLon["lat"] = 33.450701;
  //     currentLatLon["lon"] = 126.570667;
  //     displayMarker(locPosition, message);
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   currentLocation();
  //   // let container = document.getElementById("map");

  //   // let options = {
  //   //   center: new window.kakao.maps.LatLng(curLat, curLng),
  //   //   level: 10,
  //   // };
  //   // let map = new window.kakao.maps.Map(container, options);
  //   // let markerPosition = new kakao.maps.LatLng(curLat, curLng);
  //   // let marker = new kakao.maps.Marker({
  //   //   position: markerPosition,
  //   // });
  //   // marker.setMap(map);
  //   // console.log("loading kakaomap");
  // }, []);
  return (
    <>
      <div className="mainbody">
        <div id="map" style={{ width: "500px", height: "400px" }}></div>
      </div>
    </>
  );
};

export default SelectPosition;
