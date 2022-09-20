import React, { useEffect } from "react";
import styled from "styled-components";
//head에 작성한 Kakao API 불러오기
const { kakao } = window;
const MapWrapper = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  box-shadow: 2px 0 4px 0 #303030;

  @media screen and (max-width: 1000px) {
    width: 65%;
  }
  @media screen and (max-width: 800px) {
    width: 60%;
  }
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
    height: 40%;
  }
`;
const Map = ({ searchKeyword }) => {
  //마커를 담는 배열
  let markers = [];
  //검색어가 바뀔 때마다 리랜더링 되도록 useEffect 사용
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    //지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);
    //장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();
    //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const getListItem = (index, places) => {
      const el = document.createElement("li");
      let itemStr = `
      <div class="info">
      <span class="marker marker_${index + 1}">
        ${index + 1}
      </span>
      <a href="${places.place_url}">
        <h5 class="info-item place-name">${places.place_name}</h5>
        ${
          places.road_address_name
            ? `<span class="info-item road-address-name">
              ${places.road_address_name}
             </span>
             <span class="info-item address-name">
              ${places.address_name}
              </span>`
            : `<span class="info-item address-name">
              ${places.address_name}
            </span>`
        }
        <span class="info-item tel">
          ${places.phone}
        </span>
      </a>
    </div>
      `;
      el.innerHTML = itemStr;
      el.className = "item";
      return el;
    };
    const addMarker = (position, idx, title) => {
      //마커 이미지 url, 스프라이트 이미지
      let imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
      //마커 이미지 크기
      let imageSize = new kakao.maps.Size(36, 37);
      let imageOptions = {
        //스프라이트 이미지의 크기
        spriteSize: new kakao.maps.Size(36, 691),
        //스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
        //마커 좌표에 일치시킬 이미지 내에서의 좌표
        offset: new kakao.maps.Point(13, 37),
      };
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOptions
      );
      let marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });
      //지도 위에 마커 표출
      marker.setMap(map);
      //배열에 생성된 마커 추가
      markers.push(marker);
      return marker;
    };

    //지도 위에 표시되고 있는 마커를 모두 제거합니다.
    const removeMarker = () => {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    };
    //검색 결과 목록과 마커를 표출하는 함수
    const displayPlaces = (places) => {
      const listEl = document.getElementById("places-list"),
        resultEl = document.getElementById("search-result"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();
      // 검색 결과 목록에 추가된 항목들을 제거
      listEl && removeAllChildNods(listEl);
      //지도에 표시되고 있는 마커를 제거
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        //마커를 생성하고 지도에 표시
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i, undefined),
          itemEl = getListItem(i, places[i]); //검색 결과 항목 Element 생성

        //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        //LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        //마커와 검색결과 항목에 mouseover 했을 때
        //해당 장소에 인포윈도우에 장소명 표시
        //mouseout 했을 때 인포윈도우 닫기
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", () => {
            displayInfowindow(marker, title);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
          itemEl.onmouseover = () => {
            displayInfowindow(marker, title);
          };
          itemEl.onmouseout = () => {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }
      //검색결과 항목들을 검색결과 목록 Element에 추가
      listEl && listEl.appendChild(fragment);
      if (resultEl) {
        resultEl.scrollTop = 0;
      }

      //검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);
    };
    //검색결과 목록 하단에 페이지번호를 표시하는 함수
    const displayPagination = (pagination) => {
      const paginationEl = document.getElementById("pagination");
      let fragment = document.createDocumentFragment();
      let i;

      //기존에 추가된 페이지 번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild &&
          paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i.toString();

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
      paginationEl.appendChild(fragment);
    };
    //장소검색이 완료됬을 때 호출되는 콜백함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        //정상적으로 검색이 완료될 경우
        //검색 목록과 마커를 표출
        displayPlaces(data);

        //페이지 번호를 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };
    //키워드 검색을 요청하는 함수
    const searchPlaces = () => {
      let keyword = searchKeyword;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        console.log("키워드를 입력해주세요!");
        return false;
      }
      //장소검색 객체를 통해 키워드로 장소검색을 요청
      ps.keywordSearch(keyword, placesSearchCB);
    };
    //키워드로 장소를 검색.
    searchPlaces();

    //검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    //인포윈도우에 장소명을 표시
    const displayInfowindow = (marker, title) => {
      const content =
        '<div style="padding:5px;z-index:1;" class="marker-title">' +
        title +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    };
    //검색결과 목록의 자식 Element를 제거하는 함수
    const removeAllChildNods = (el) => {
      while (el.hasChildNodes()) {
        el.lastChild && el.removeChild(el.lastChild);
      }
    };
  }, [searchKeyword]);
  return (
    <>
      <MapWrapper id="map" className="map">
        {/* <div id="map" className="map"></div> */}
      </MapWrapper>
      <div id="search-result">
        <p className="result-text">
          <span className="result-keyword">{searchKeyword}</span>
          검색결과
        </p>
        <div className="scroll-wrapper" overflow="scroll">
          <ul id="places-list"></ul>
        </div>
        <div id="pagination"></div>
      </div>
    </>
  );
};

export default Map;
