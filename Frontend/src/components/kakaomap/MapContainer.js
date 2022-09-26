import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const KMap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

const MapContainer = ({ lat, lng, planList, onHandleMarkerHover }) => {
  // 마커 표시하는 함수
  const displayMarker = (map, lat, lng, place, index) => {
    const markerImg = place.isMain
      ? `${process.env.PUBLIC_URL}/assets/plan/main_marker.png`
      : `${process.env.PUBLIC_URL}/assets/plan/white.png`;
    const size = place.isMain ? 48 : 36;
    const imageSrc = markerImg;
    const imageSize = new kakao.maps.Size(size, size);
    const imageOption = {
      // offset: new kakao.maps.Point(size * 0.66, size * 0.66),
    };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

    if (!place.isMain) {
      const overlayContent = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        width: 32px;
        height: 32px;
        background-color: rgba(128,224,128,0.9);
        border-radius: 100%;
      ">${index}</div>`;

      const overlayPosition = new kakao.maps.LatLng(lat, lng);
      const overlay = new kakao.maps.CustomOverlay({
        position: overlayPosition,
        content: overlayContent,
      });
      overlay.setMap(map);
    }

    kakao.maps.event.addListener(marker, "mouseover", () =>
      console.log(marker)
    );
  };

  useEffect(() => {
    // 맵 생성
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    // PlanList에 대해
    for (let i = 0; i < planList.length; i++) {
      // 마커 생성
      displayMarker(
        map,
        planList[i].latitude,
        planList[i].longitude,
        planList[i],
        i + 1
      );

      // 마커 사이 선 생성
      if (i < planList.length - 1) {
        const linePath = [
          new kakao.maps.LatLng(planList[i].latitude, planList[i].longitude),
          new kakao.maps.LatLng(
            planList[i + 1].latitude,
            planList[i + 1].longitude
          ),
        ];
        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 3,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeStyle: "solid",
        });
        polyline.setMap(map);
      }
    }
  }, [lat, lng, planList]);

  return <KMap id="myMap"></KMap>;
};

export default MapContainer;
