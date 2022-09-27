import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const KMap = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const { kakao } = window;

const MapContainer = ({ lat, lng, mapLevel, placeList, planList }) => {
	// 마커 표시하는 함수
	const displayMarker = (map, lat, lng, place, index, type) => {
		let markerImg = place.isMain ? `${process.env.PUBLIC_URL}/assets/plan/main_marker.png` : `${process.env.PUBLIC_URL}/assets/plan/white.png`;
		const size = place.isMain ? 48 : 36;
		const imageSrc = markerImg;
		const imageSize = new kakao.maps.Size(size, size);

		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
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
				background-color: ${type === "plan" ? "rgba(128,224,128,0.9)" : "rgba(62,75,92,0.9)"};
        border-radius: ${type === "plan" ? "100%" : "0%"};
				z-index: ${type === "plan" ? "10" : "0"};
      ">${index}</div>`;

			const overlayPosition = new kakao.maps.LatLng(lat, lng);
			const overlay = new kakao.maps.CustomOverlay({
				position: overlayPosition,
				content: overlayContent,
			});
			overlay.setMap(map);
		}
	};

	useEffect(() => {
		// 맵 생성
		const container = document.getElementById("myMap");
		const options = {
			center: new kakao.maps.LatLng(lat, lng),
			level: mapLevel,
		};
		const map = new kakao.maps.Map(container, options);

		// PlaceList에 대해
		for (let i = 0; i < placeList.length; i++) {
			displayMarker(map, placeList[i].latitude, placeList[i].longitude, placeList[i], i + 1, "place");
		}

		// PlanList에 대해
		for (let i = 0; i < planList.length; i++) {
			// 마커 생성
			displayMarker(map, planList[i].latitude, planList[i].longitude, planList[i], i + 1, "plan");

			// 마커 사이 선 생성
			if (i < planList.length - 1) {
				const linePath = [
					new kakao.maps.LatLng(planList[i].latitude, planList[i].longitude),
					new kakao.maps.LatLng(planList[i + 1].latitude, planList[i + 1].longitude),
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
	}, [lat, lng, placeList, planList]);

	return <KMap id="myMap"></KMap>;
};

export default MapContainer;
