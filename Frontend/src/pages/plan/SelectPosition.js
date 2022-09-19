/* global kakao */
import React from "react";
import { useEffect } from "react";
import SelectSearchLanding from "../../components/plan/SelectSearchLanding";

const SelectPosition = () => {
  // const { kakao } = window;

  // useEffect(() => {
  //   // const placesSearchCB = (data, status, pagination){
  //   //   if(status === kakao.maps.services.Status.OK) {
  //   //     let bounds = new kakao.maps.LatLngBounds();
  //   //     for(let i=0; i<data.length; i++){
  //   //       displayMarkerSearch(data[i]);
  //   //       bounds.extend(new kakao.maps.LatLng(data[i].y,data[i].x));
  //   //     }
  //   //     map.setBounds(bounds);
  //   //   }
  //   // }
  //   // const displayMarkerSearch = (place) =>{
  //   //   let marker = new kakao.maps.Marker({
  //   //     map:map,
  //   //     position: new kakao.maps.LatLng(place.y, place.x)
  //   //   });
  //   //   kakao.maps.event.addListener(marker, 'click', ()=>{
  //   //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
  //   //     infowindow.open(map.marker);
  //   //   })
  //   // }
  //   const displayMarker = (locPosition, message) => {
  //     let imageSrc =
  //       "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  //     let imageSize = new kakao.maps.Size(24, 35);
  //     let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //     let marker = new kakao.maps.Marker({
  //       map: map,
  //       position: locPosition,
  //       image: markerImage,
  //     });
  //     let iwContent = message,
  //       iwRemoveable = true;
  //     let infowindow = new kakao.maps.InfoWindow({
  //       content: iwContent,
  //       removable: iwRemoveable,
  //     });
  //     infowindow.open(map, marker);
  //     map.setCenter(locPosition);
  //   };
  //   const currentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         let lat = position.coords.latitude,
  //           lon = position.coords.longitude;
  //         let locPosition = new kakao.maps.LatLng(lat, lon);
  //         let message = `<div style="padding:5px;">현위치</div>`;
  //         displayMarker(locPosition, message);
  //       });
  //     } else {
  //       let locPosition = new kakao.maps.LatLng(33.453333, 126.573333),
  //         message = "현재 위치를 알 수 없어 기본 위치로 이동합니다.";
  //       currentLatLon["lat"] = 33.453333;
  //       currentLatLon["lon"] = 126.573333;
  //       displayMarker(locPosition, message);
  //     }
  //     return true;
  //   };
  //   //지도를 담을 영역의 DOM 레퍼런스
  //   let container = document.getElementById("map");
  //   //지도를 생성할 때 필요한 기본 옵션
  //   let options = {
  //     //지도의 중심좌표
  //     center: new kakao.maps.LatLng(33.453333, 126.573333),
  //     //지도의 레벨(확대, 축소 정도)
  //     level: 6,
  //   };
  //   let markers = [];
  //   //지도 생성 및 객체 리턴
  //   let map = new kakao.maps.Map(container, options);
  //   // let ps = new kakao.maps.services.Places();
  //   // ps.keywordSearch("입력 값", placesSearchCB);
  //   // let markerPosition = new kakao.maps.LatLng(33.453333, 126.573333);
  //   // //마커 이미지의 이미지 주소
  //   // let imageSrc =
  //   //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  //   // // //마커 이미지의 이미지 크기
  //   // let imageSize = new kakao.maps.Size(24, 35);
  //   // // //마커 이미지 생성
  //   // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  //   // //마커 생성
  //   // let marker = new kakao.maps.Marker({
  //   //   // //마커를 표시할 지도
  //   //   // map: map,
  //   //   //마커를 표시할 위치
  //   //   position: markerPosition,
  //   //   //마커의 타이틀, 마커에 마우스를 올리면 표시
  //   //   // title: "",
  //   //   //마커 이미지
  //   //   image: markerImage,
  //   // marker.setMap(map);
  //   currentLocation();
  // }, []);
  return (
    <>
      <SelectSearchLanding />
      {/* <div className="mainbody">
        <div id="map" style={{ width: "500px", height: "400px" }}></div>
      </div> */}
      {/* <div id="position-wrap" className="bg_white">
        <div className="option">
          <div>
            <form onsubmit="searchPlaces(); return false;">
              키워드 :{" "}
              <input type="text" value="이태원 맛집" id="keyword" size="15" />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="positionList"></ul>
        <div id="pagination"></div>
      </div> */}
    </>
  );
};

export default SelectPosition;
