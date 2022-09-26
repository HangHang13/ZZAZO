import React from "react";
import { useEffect } from "react";

const KMap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

const MapContainer = ({lat ,lng}) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng);
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return <KMap id="myMap"></KMap>;
};

export default MapContainer;
