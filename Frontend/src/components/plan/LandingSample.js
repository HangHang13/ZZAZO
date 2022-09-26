import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import { storeSetPosition } from "../../store/reducers/position";
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
const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  box-shadow: 2px 0 4px 0 #303030;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    width: 35%;
  }
  @media screen and (max-width: 800px) {
    width: 40%;
  }
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
    height: 60%;
  }
`;
const MainPlaceInputWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 90%;
  height: 2.5rem;
  border-radius: 8px;
  border: none;
  margin-top: 1rem;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
`;

const MainPlaceSearchButton = styled.button`
  position: relative;
  height: 100%;
  width: 15%;
  background-color: white;
  border: none;
  border-radius: 8px;
`;

const MainPlaceInput = styled.input`
  display: flex;
  width: 80%;
  height: 100%;
  line-height: 100%;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  fone-weight: bold;
`;
const LandingSample = () => {
  const position = useSelector((state) => state.position.value);
  const dispatch = useDispatch();
  //입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  //제출한 검색어 관리
  const [KeyWord, setKeyWord] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [clickLat, setClickLat] = useState(0);
  const [clickLng, setClickLng] = useState(0);
  const [placeList, setPlaceList] = useState([]);
  console.log(position);
  //입력 폼 변화 감지하여 입력값을 state에 담아주는 함수
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  //제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e) => {
    e.preventDefault();
    setKeyWord(Value);
  };
  //검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };
  //최종 좌표 넘겨주는 함수
  const nextStep = () => {
    if (clickLat === 0 && clickLng === 0) {
      alert("위치를 선택해 주세요.");
      return false;
    }
    const data = {
      lat: clickLat,
      lng: clickLng,
    };
    dispatch(storeSetPosition({ data: data }));
    console.log(position.data);
  };
  //지도상의 전체 마커를 담는 배열
  let markers = [];

  //검색어가 바뀔 때마다 리랜더링 되도록 useEffect 사용
  useEffect(() => {
    //지도 영역 컨테이너
    const mapContainer = document.getElementById("map");
    //최초 랜더링 지도 옵션
    const mapOptions = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 6,
    };
    //최초랜더링 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // const map = new kakao.maps.Map(mapContainer, mapOptions);
    //장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    //초기 위치 GPS 중심 재설정
    const firstLocation = () => {
      //GPS 좌표 기능이 정상적으로 동작하는가 판단
      if (navigator.geolocation) {
        //정상적으로 동작할경우
        navigator.geolocation.getCurrentPosition((position) => {
          //GPS 기반 위도 경도 재설정
          setLat((prev) => position.coords.latitude);
          setLng((prev) => position.coords.longitude);
          //GPS 기반 위도 경도 최종좌표 재설정
          setClickLat((prev) => lat);
          setClickLng((prev) => lng);
          //맵 중앙 재설정
          map.setCenter(new kakao.maps.LatLng(lat, lng));
        });
      } else {
        //GPS 기능 실패시 기본 좌표
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      }
    };
    //GPS 기반 초기위치 함수 실행
    firstLocation();

    //초기 마커 설정
    //마커 이미지 소스
    let imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    //마커 이미지 크기
    let imageSize = new kakao.maps.Size(36, 37);
    //마커 옵션
    let imageOptions = {
      //스프라이트 이미지의 크기
      spriteSize: new kakao.maps.Size(36, 691),
      //스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      spriteOrigin: new kakao.maps.Point(0, 0 + 10),
      //마커 좌표에 일치시킬 이미지 내에서의 좌표
      offset: new kakao.maps.Point(13, 37),
    };
    //마커 이미지 설정
    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOptions
    );
    //마커 설정
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      image: markerImage,
    });
    //지도 위에 마커 표출
    marker.setMap(map);
    //배열에 생성된 마커 추가
    markers.push(marker);
    //검색결과 리스트 각 아이템 정보생성
    const getListItem = (index, places) => {
      const el = document.createElement("li");
      let itemStr = `
      <div className="info">
        <span className="marker marker_${index + 1}">
          ${index + 1}
        </span>
        <div href="${places.place_url}">
          <h5 className="info-item place-name">${places.place_name}</h5>
          ${
            places.road_address_name
              ? `<span className="info-item road-address-name">
                ${places.road_address_name}
              </span>
              <span className="info-item address-name">
                ${places.address_name}
                </span>`
              : `<span className="info-item address-name">
                ${places.address_name}
              </span>`
          }
            <span className="info-item tel">
              ${places.phone}
            </span>
        </div>
      </div>
      `;
      el.innerHTML = itemStr;
      el.className = "item";
      return el;
    };
    //마커 생성 함수
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
      //마커 이미지 설정
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOptions
      );
      //마커 설정
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
      //전체 마커 배열 전부 제거
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      //전체 마커 배열 초기화
      markers = [];
    };

    //검색 결과 목록과 마커를 표출하는 함수
    const displayPlaces = (places) => {
      //최종좌표 0으로 갱신
      setClickLat((prev) => 0);
      setClickLng((prev) => 0);
      //리스트 요소, 결과 요소, 프레그먼트, 바운즈 초기화
      const listEl = document.getElementById("places-list"),
        resultEl = document.getElementById("search-result"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();
      // 검색 결과 목록에 추가된 항목들을 제거
      listEl && removeAllChildNods(listEl);
      listEl.className = "off";
      //지도에 표시되고 있는 마커를 제거
      removeMarker();
      //검색된 요소들만큼
      for (let i = 0; i < places.length; i++) {
        //마커를 생성하고 지도에 표시
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i, undefined),
          itemEl = getListItem(i, places[i]); //검색 결과 항목 Element 생성
        itemEl.className = "off";
        //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        //LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        //마커와 검색결과 항목에 mouseover 했을 때
        //해당 장소에 인포윈도우에 장소명 표시
        //mouseout 했을 때 인포윈도우 닫기
        (function (marker, title, placeInfo) {
          kakao.maps.event.addListener(marker, "mouseover", () => {
            displayInfowindow(marker, title);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
          kakao.maps.event.addListener(marker, "click", () => {
            console.log(placePosition);
            console.log(marker.T.lf);
            // marker.setImage(40, 50);
            setClickLat((prev) => placePosition.La);
            setClickLng((prev) => placePosition.Ma);

            // setClickLat((prev) => lat);
            // setClickLng((prev) => lng);
            // console.log(clickLat);
            // console.log(clickLng);
            // map.setCenter(clickLat, clickLng);
          });
          itemEl.onmouseover = () => {
            displayInfowindow(marker, title);
          };
          itemEl.onmouseout = () => {
            infowindow.close();
          };
          itemEl.onclick = () => {
            console.log(placePosition);
            console.log(marker.T.lf);
            console.log(placeInfo);
            //  marker.setImage(40, 50);
            setClickLat((prev) => placePosition.La);
            setClickLng((prev) => placePosition.Ma);
            // if () {
            //   itemEl.className = "on";
            //   itemEl.style.backgroundColor = "green";
            // }
            //  else if (
            //   itemEl.className === "off" &&
            //   listEl.className === "on"
            // ) {
            //   if (itemEl.style.backgroundColor === "green") {
            //     itemEl.style.backgroundColor = "white";
            //   }
            //   itemEl.style.backgroundColor = "green";
            // }
          };
        })(marker, places[i].place_name, places[i]);

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
      let keyword = KeyWord;

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
    //지도 클릭시 중심좌표 이동 후 마커생성
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const listEl = document.getElementById("places-list");
      // 검색 결과 목록에 추가된 항목들을 제거
      listEl && removeAllChildNods(listEl);
      //지도에 표시되고 있는 마커를 제거
      removeMarker();

      //중심좌표를 마우스 클릭한 좌표로 설정
      let latlng = mouseEvent.latLng;
      //맵 중앙 이동
      map.setCenter(latlng);
      //마커 생성
      marker = addMarker(latlng, 0, undefined);
      //마커 지도에 표출
      marker.setMap(map);
      //전체 마커 배열에 마커 추가
      markers.push(marker);
      //최종좌표 갱신
      setClickLat((prev) => marker.n.La);
      setClickLng((prev) => marker.n.Ma);
      console.log(marker.n.La);
      console.log(marker.n.Ma);
    });
  }, [KeyWord, lat, lng]); //키워드, 위도, 경도가 바뀔때마다 랜더링
  return (
    <>
      {/* 제출한 검색어 넘기기 */}
      {/* 맵 지도 영역 */}
      <MapWrapper id="map" className="map"></MapWrapper>
      {/* 검색 리스트 영역 */}
      <ListWrapper>
        <MainPlaceInputWrapper onSubmit={submitKeyword}>
          <MainPlaceSearchButton onClick={valueChecker}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
          </MainPlaceSearchButton>
          <MainPlaceInput
            type="text"
            id="movie-title"
            className="form__input"
            name="place"
            onChange={keywordChange}
            placeholder="검색어를 입력해주세요.(ex: 강남 맛집)"
            required
          />
          {/* <input
            className="btn form__submit"
            type="submit"
            value="검색"
            onClick={valueChecker}
          ></input> */}
        </MainPlaceInputWrapper>
        <div
          id="search-result"
          style={{ margin: "1rem", height: "100%", overflow: "scroll" }}
        >
          <p className="result-text">
            <span className="result-keyword">{KeyWord}</span>
            검색결과
          </p>
          <div className="scroll-wrapper">
            <ul id="places-list"></ul>
          </div>
          <div id="pagination"></div>
        </div>
        {/* <div className="landing-page">
          <div className="landing-page__inner">
            <div className="search-form-container">
              <form className="search-form" onSubmit={submitKeyword}>
                <label htmlFor="place" className="form__label">
                  <input
                    type="text"
                    id="movie-title"
                    className="form__input"
                    name="place"
                    onChange={keywordChange}
                    placeholder="검색어를 입력해주세요.(ex: 강남 맛집)"
                    required
                  />
                  <div className="btn-box">
                    <input
                      className="btn form__submit"
                      type="submit"
                      value="검색"
                      onClick={valueChecker}
                    />
                  </div>
                </label>
              </form>
            </div>
          </div> */}

        {/* </div> */}
        {/* 최종 좌표 넘겨주는 버튼 */}
        <Button message="다음" clickEvent={nextStep} />
      </ListWrapper>
    </>
  );
};

export default LandingSample;
