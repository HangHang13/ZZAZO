import React, { useEffect, useState, useRef } from "react";

const { kakao } = window;

const SelectMapContainer = ({ searchPlace }) => {
  const [Place, setPlaces] = useState([]);

  const markerRef = useRef([]);
  const selectPlace = (key, y, x, road, address) => {
    const result = { key, y, x, road, address };
    console.log(key, y, x);
    // let marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(y, x),
    // });
    // marker.setMap(map);
  };
  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("selectMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    console.log(container);
    console.log(options);
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    const displayMarker = (place) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    };
    const displayPagination = (pagination) => {
      let paginationEI = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;
      while (paginationEI.hasChildNodes()) {
        paginationEI.removeChild(paginationEI.lastChild);
      }
      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }
        fragment.appendChild(el);
      }
      paginationEI.appendChild(fragment);
    };
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
        displayPagination(pagination);
        setPlaces(data);
      }
    };
    ps.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);
  return (
    <>
      <div id="selectMap" style={{ width: "500px", height: "500px" }}></div>
      <div
        id="result-list"
        style={{
          border: "1px solid black",
          width: "300px",
          height: "500px",
          overflow: "scroll",
        }}
      >
        {Place.map((item, i) => (
          <div
            key={i}
            style={{ marginTop: "20px" }}
            onClick={() =>
              selectPlace(
                i,
                item.y,
                item.x,
                item.road_address_name,
                item.address_name
              )
            }
          >
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                  <span>{item.y}</span>
                  <span>{item.x}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </>
  );
};

export default SelectMapContainer;
