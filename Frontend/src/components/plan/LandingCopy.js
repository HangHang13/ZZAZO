import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
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

const MarkerInfo = styled.div`
  padding: 5px;
  color: #000;
`;
const SearchResult = styled.div`
  margin: 1rem;
  height: 100%;
  overflow: scroll;
`;
const ScrollList = styled.ul`
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 5px;
`;
const SelectedList = styled.div`
  width: 100%;
  background-color: #80e080;
`;
const NotSelectedList = styled.div`
  width: 100%;
`;
const LandingCopy = () => {
  const position = useSelector((state) => state.position.value);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [map, setMap] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [KeyWord, setKeyWord] = useState("");
  const [Value, setValue] = useState("");
  //다중 마커 혹은 검색리스트 선택후 장소 확정 함수
  const selectPlace = () => {};

  //최종 좌표 넘겨주는 함수
  const nextStep = () => {
    console.log(markers);
    if (markers.length !== 1) {
      alert("위치를 선택해 주세요.");
      return false;
    }

    const data = {
      position: markers[0].position,
      content: markers[0].content,
    };
    console.log(data);
  };
  //주소-좌표 변환 객체 생성
  const geocoder = new kakao.maps.services.Geocoder();
  //입력 폼 변화 감지하여 입력값을 state에 담아주는 함수
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const onHandleEnter = (e) => {
    if (e.keyCode === 13) {
      setKeyWord((prev) => Value);
    }
  };
  const removePagination = () => {
    const paginationEl = document.getElementById("pagination");
    while (paginationEl.hasChildNodes()) {
      paginationEl.lastChild &&
        paginationEl.removeChild(paginationEl.lastChild);
    }
  };
  //검색결과 목록 하단에 페이지 번호를 표시하는 함수
  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    let fragment = document.createDocumentFragment();
    let i;
    //기존에 추가된 페이지 번호 삭제
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
  //제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e) => {
    e.preventDefault();
    setKeyWord((prev) => Value);

    const map = mapRef.current;
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(KeyWord, (data, status, _pagination) => {
      console.log(KeyWord);
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        let finalLat;
        let finalLng;
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: {
              placename: data[i].place_name,
              addressname: data[i].address_name,
              roadname: data[i].road_address_name,
              phone: data[i].phone,
              place_url: data[i].place_url,
            },
          });
          finalLat = data[i].y;
          finalLng = data[i].x;
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
        displayPagination(_pagination);
      }
    });
  };
  //검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };
  const searchAddFromCoords = (lat, lng, callback) => {
    //좌표로 행정동 주소 정보를 요청합니다.
    geocoder.coord2RegionCode(lng, lat, callback);
  };
  const searchDetailAddFromCoords = (lat, lng, callback) => {
    {
      //좌표로 법정동 상세 주소 정보를 요청합니다.
      return geocoder.coord2Address(lng, lat, callback);
    }
  };

  const userLocation = () => {
    let markers = [];
    let roadAddr;
    let jibunAddr;
    let dongAddr;
    removePagination();
    setKeyWord((prev) => "");
    const map = mapRef.current;
    if (!map) return;
    const bounds = new kakao.maps.LatLngBounds();
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          searchDetailAddFromCoords(
            position.coords.latitude,
            position.coords.longitude,
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                console.log(result[0]);
                roadAddr = !!result[0].road_address
                  ? result[0].road_address.address_name
                  : "";
                jibunAddr = result[0].address.address_name;
                console.log(roadAddr);
                console.log(jibunAddr);
              }
              markers.push({
                position: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                content: {
                  placename: "사용자위치",
                  addressname: jibunAddr,
                  roadname: roadAddr,
                  phone: "",
                  place_url: "",
                },
              });
              setMarkers(markers);
              setInfo(markers);
              console.log(markers);
            }
          );
          // searchAddFromCoords(position.coords.latitude, position.coords.longitude, (result,status)=>{
          //   if(status === kakao.maps.services.Status.OK){
          //     for(let i=0; i<result.length; i++){
          //       if(result[i].region_type === 'H'){
          //         dongAddr = result[i].address_name;
          //       }
          //     }
          //   }
          // })

          bounds.extend(
            new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
          setMap((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          map.setBounds(bounds);
        },
        (err) => {
          setMap((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMap((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  };
  useEffect(() => {
    // const map = mapRef.current;
    // if (!map) return;
    // const ps = new kakao.maps.services.Places();
    // ps.keywordSearch(KeyWord, (data, status, _pagination) => {
    //   console.log(KeyWord);
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     const bounds = new kakao.maps.LatLngBounds();
    //     let markers = [];
    //     let finalLat;
    //     let finalLng;
    //     for (let i = 0; i < data.length; i++) {
    //       markers.push({
    //         position: {
    //           lat: data[i].y,
    //           lng: data[i].x,
    //         },
    //         content: {
    //           placename: data[i].place_name,
    //           addressname: data[i].address_name,
    //           roadname: data[i].road_address_name,
    //           phone: data[i].phone,
    //           place_url: data[i].place_url,
    //         },
    //       });
    //       finalLat = data[i].y;
    //       finalLng = data[i].x;
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }
    //     setMarkers(markers);
    //     map.setBounds(bounds);
    //   }
    // });
  }, [markers]);
  return (
    <>
      {/* 제출한 검색어 넘기기 */}
      {/* 맵 지도 영역 */}
      <MapWrapper>
        <Map
          center={map.center}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={9} // 지도의 확대 레벨
          // onCreate={setMap}
          ref={mapRef}
          // onCreate={setMap}
          onClick={(_t, mouseEvent) => {
            let markers = [];
            let roadAddr;
            let jibunAddr;
            removePagination();
            setKeyWord((prev) => "");
            const map = mapRef.current;
            if (!map) return;
            const bounds = new kakao.maps.LatLngBounds();
            searchDetailAddFromCoords(
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
              function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                  console.log(result[0]);
                  roadAddr = !!result[0].road_address
                    ? result[0].road_address.address_name
                    : "";
                  jibunAddr = result[0].address.address_name;
                  console.log(roadAddr);
                  console.log(jibunAddr);
                }
                markers.push({
                  position: {
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                  },
                  content: {
                    placename: "지정위치",
                    addressname: jibunAddr,
                    roadname: roadAddr,
                    phone: "",
                    place_url: "",
                  },
                });
                setMarkers(markers);
                console.log(markers);
              }
            );
            setInfo(markers);
            setMap((prev) => ({
              ...prev,
              center: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            }));
            // markers.push({
            //   position: {
            //     lat: mouseEvent.latLng.getLat(),
            //     lng: mouseEvent.latLng.getLng(),
            //   },
            //   content: {
            //     placename: "사용자위치",
            //     addressname: "",
            //     roadname: "",
            //     phone: "",
            //     place_url: "",
            //   },
            // });
            bounds.extend(
              new kakao.maps.LatLng(
                mouseEvent.latLng.getLat(),
                mouseEvent.latLng.getLng()
              )
            );
            map.setBounds(bounds);
            // setMarkers(markers);
          }}
          // ref={mapRef}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <MarkerInfo>
                  <span>{marker.content.placename}</span>
                  <br />
                  <span>{marker.content.addressname}</span>
                  <br />
                  {marker.content.roadname ? (
                    <>
                      <span>{marker.content.roadname}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {marker.content.phone ? (
                    <>
                      <span>{marker.content.phone}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{marker.content.place_url}</span>
                </MarkerInfo>
              )}
            </MapMarker>
          ))}
          {/* {!mapState.isLoading && (
            <MapMarker position={mapState.center}>
              <MarkerInfo>
                {mapState.errMsg ? mapState.errMsg : "현재 위치"}
              </MarkerInfo>
            </MapMarker>
          )} */}
        </Map>
      </MapWrapper>
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
            onKeyDown={onHandleEnter}
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
        <p className="result-text">
          <span className="result-keyword">{KeyWord}</span>
          검색결과
        </p>
        <SearchResult id="search-result">
          {/* <div className="scroll-wrapper"> */}
          {markers.map((marker) => (
            <ScrollList
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              id="places-list"
              onClick={() => setInfo(marker)}
            >
              {info && info.content !== marker.content && (
                <NotSelectedList>
                  <span>{marker.content.placename}</span>
                  <br />
                  <span>{marker.content.addressname}</span>
                  <br />
                  {marker.content.roadname ? (
                    <>
                      <span>{marker.content.roadname}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {marker.content.phone ? (
                    <>
                      <span>{marker.content.phone}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{marker.content.place_url}</span>
                </NotSelectedList>
              )}
              {info && info.content === marker.content && (
                <SelectedList>
                  <span>{marker.content.placename}</span>
                  <br />
                  <span>{marker.content.addressname}</span>
                  <br />
                  {marker.content.roadname ? (
                    <>
                      <span>{marker.content.roadname}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {marker.content.phone ? (
                    <>
                      <span>{marker.content.phone}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{marker.content.place_url}</span>
                </SelectedList>
              )}
            </ScrollList>
          ))}
          {/* </div> */}
          <div id="pagination"></div>
        </SearchResult>
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
        <Button message="사용자위치" clickEvent={userLocation}></Button>
        <Button message="장소확정" clickEvent={selectPlace}></Button>
        <Button message="다음" clickEvent={nextStep} />
      </ListWrapper>
    </>
  );
};

export default LandingCopy;
