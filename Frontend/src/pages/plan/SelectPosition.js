/* global kakao */
import React from "react";
import { useEffect } from "react";

const SelectPosition = () => {
  //지도를 담을 영역의 DOM 레퍼런스
  let container = document.getElementById("map");
  //지도를 생성할 때 필요한 기본 옵션
  let options = {
    //지도의 중심좌표
    center: new kakao.maps.LatLng(33.453333, 126.573333),
    //지도의 레벨(확대, 축소 정도)
    level: 3,
  };
  //지도 생성 및 객체 리턴
  let map = new kakao.maps.Map(container, options);
  let markerPosition = new kakao.maps.LatLng(33.453333, 126.573333);
  //마커 이미지의 이미지 주소
  // let imageSrc = "assets/ZZAZOLOGO.png";
  // //마커 이미지의 이미지 크기
  // let imageSize = new kakao.maps.Size(24, 35);
  // //마커 이미지 생성
  // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  //마커 생성
  let marker = new kakao.maps.Marker({
    // //마커를 표시할 지도
    // map: map,
    //마커를 표시할 위치
    position: markerPosition,
    //마커의 타이틀, 마커에 마우스를 올리면 표시
    // title: "",
    //마커 이미지
    // image: markerImage,
  });
  marker.setMap(map);
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
