import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import { storeSetPosition } from "../../store/reducers/position";
import { ButtonWrapper } from "../styled/Wrapper";
import { useNavigate } from "react-router-dom";
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
    // display: block;
    width: 100%;
    height: 60%;
  }
`;
const SearchWrapper = styled.div`
  margin: 1.5rem;
  border-radius: 50px;
  width: 90%;
  padding: 0.5rem;
  background-color: #c0f0b0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 2px 2px grey;
  @media screen and (max-width: 500px) {
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  width: max-content;
  color: #000;
  font-weight: bold;
`;
const SearchResult = styled.div`
  // margin: 1rem;
  width: 100%;
  height: 85%;
  overflow: auto;
`;
const ScrollList = styled.ul`
  font-size: 1rem;
  // border: 1px solid black;
  // border-radius: 5px;
  @media screen and (max-width: 1000px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
  }
`;
const SelectedList = styled.div`
  width: 95%;
  background-color: #c0f0b0;
`;
const NotSelectedList = styled.div`
  width: 95%;
  &:hover {
    background-color: #80e080;
  }
`;
const ResultText = styled.p`
  margin: 0.3rem;
`;
const ResultKeyword = styled.span`
  color: blue;
`;
const ListLine = styled.hr`
  border: 0;
  margin: 0.4rem;
  height: 0.2rem;
  background: #80e080;
`;
const SelectedListLine = styled.hr`
  border: 0;
  margin: 0.4rem;
  height: 0.2rem;
  background: #c0f0b0;
`;
const PlaceName = styled.h3`
  font-weight: bolder;
`;
const RoadAddressName = styled.span`
  font-weight: bold;
`;
const AddressName = styled.span`
  font-weight: lighter;
  color: gray;
`;
const ButtonList = styled.div`
  width: 100%;
  height: 10%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 1000px) {
    width: 35%;
  }
  @media screen and (max-width: 800px) {
    width: 40%;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    width: 100%;
    height: 40%;
  }
`;
const PaginationBox = styled.div`
  display: flex;
  justify-content: space-around;
  height: 2rem;

  padding: 2px;
  .off {
    width: 2rem;
    padding: 2px;
    border: 1px solid #80e080;
    color: #80e080;
    border-radius: 5px;
    text-decoration-line: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .on {
    width: 2rem;
    padding: 2px;
    border: 1px solid #80e080;
    border-radius: 5px;
    background-color: #80e080;
    color: white;
    text-decoration-line: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonListBtn = styled.button`
  display: flex;
  width: 80px;
  height: 3rem;
  color: #000000;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #80e080;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  @media screen and (max-width: 1000px) {
    width: 60vw;
  }
  @media screen and (max-width: 800px) {
    width: 60vw;
  }
  @media screen and (max-width: 500px) {
    width: 40vw;
  }
  transition: all 0.2s ease-in;
  &:hover {
    background: #80e080;
  }
  &:active {
    background: rgba(128, 224, 128, 0.5);
    border: 1px solid #80e080;
  }
`;

const BeforeButton = styled(ButtonWrapper)`
  animation: motion 0.5s linear infinite alternate;
  margin-top: 0px;
  width: 240px;
  background-color: #80e080;
  border: 1px solid #80c0a0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);

  @keyframes motion {
    0% {
      margin-top: 0px;
    }
    100% {
      margin-top: 0.2rem;
    }
  }
  @media screen and (max-width: 1000px) {
    width: 100vw;
  }
  @media screen and (max-width: 800px) {
    width: 70vw;
  }
  @media screen and (max-width: 500px) {
    width: 40vw;
  }
`;

const Landing = ({ onHandlePageOut }) => {
  const position = useSelector((state) => state.position.value);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [map, setMap] = useState({
    center: {
      lat: 36.3553323999952,
      lng: 127.298414851088,
    },
    errMsg: null,
    isLoading: true,
  });
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [KeyWord, setKeyWord] = useState("");
  const [Value, setValue] = useState("");

  const navigate = useNavigate();

  //최종 좌표 넘겨주는 함수
  const nextStep = () => {
    console.log(selectedMarker);
    console.log(selectedMarker.length);
    if (selectedMarker.length !== 1) {
      alert("위치를 선택해 주세요.");
      return false;
    }

    const data = {
      position: selectedMarker[0].position,
      content: selectedMarker[0].content,
    };
    dispatch(storeSetPosition({ data: data }));
    onHandlePageOut();
    setTimeout(() => navigate("/planmakecard", { state: data }), 400);
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
      el.className = "off";
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
    setSelectedMarker([]);
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
        setInfo(markers);
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
    setSelectedMarker([]);
    setClickedMarker(null);
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
              setSelectedMarker(markers);
              setInfo(markers);
              console.log(markers);
              console.log(selectedMarker);
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
          map.setLevel(4);
          map.setCenter(
            new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
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
  const MARKER_WIDTH = 36; // 기본, 클릭 마커의 너비
  const MARKER_HEIGHT = 40; // 기본, 클릭 마커의 높이
  const OFFSET_X = 10; // 기본, 클릭 마커의 기준 X좌표
  const OFFSET_Y = MARKER_HEIGHT; // 기본, 클릭 마커의 기준 Y좌표
  const OVER_MARKER_WIDTH = 36; // 오버 마커의 너비
  const OVER_MARKER_HEIGHT = 40; // 오버 마커의 높이
  const OVER_OFFSET_X = 10; // 오버 마커의 기준 X좌표
  const OVER_OFFSET_Y = OVER_MARKER_HEIGHT; // 오버 마커의 기준 Y좌표
  const SPRITE_MARKER_URL = "assets/markerImage/selectMarker3.png"; // 스프라이트 마커 이미지 URL
  const SPRITE_WIDTH = 109; // 스프라이트 이미지 너비
  const SPRITE_HEIGHT = 78; // 스프라이트 이미지 높이
  const SPRITE_GAP = 0; // 스프라이트 이미지에서 마커간 간격
  const EventMarkerContainer = ({
    position,
    index,
    onClick,
    isClicked,
    marker,
  }) => {
    const map = mapRef.current;
    const [isOver, setIsOver] = useState(false);
    const gapX = MARKER_WIDTH + SPRITE_GAP; // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
    const originY = MARKER_HEIGHT + SPRITE_GAP; // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
    const overOriginY = OVER_MARKER_HEIGHT + SPRITE_GAP; // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
    const normalOrigin = { x: 0, y: originY }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
    const clickOrigin = { x: gapX * 2, y: originY }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
    const overOrigin = { x: gapX, y: originY }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표
    let spriteOrigin = isOver ? overOrigin : normalOrigin;

    if (isClicked) {
      spriteOrigin = clickOrigin;
    }

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={onClick}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
        image={{
          src: SPRITE_MARKER_URL,
          size: {
            width: MARKER_WIDTH,
            height: MARKER_HEIGHT,
          },
          options: {
            offset: {
              x: OFFSET_X,
              y: OFFSET_Y,
            },
            spriteSize: {
              width: SPRITE_WIDTH,
              height: SPRITE_HEIGHT,
            },
            spriteOrigin: spriteOrigin,
          },
        }}
        infoWindowOptions={{
          zIndex: 2,
        }}
      >
        {info && info.content === marker.content && (
          <MarkerInfo>
            {/* <span>선택위치</span>
                  <br /> */}
            {marker.content.placename}
            {/* <br />
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
                  <span>{marker.content.place_url}</span> */}
          </MarkerInfo>
        )}
      </MapMarker>
    );
  };
  const [clickedMarker, setClickedMarker] = useState();
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
  }, [markers, selectedMarker]);
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
          level={4} // 지도의 확대 레벨
          // onCreate={setMap}
          ref={mapRef}
          // onCreate={setMap}
          onClick={(_t, mouseEvent) => {
            let markers = [];
            let roadAddr;
            let jibunAddr;
            setSelectedMarker([]);
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
                setSelectedMarker(markers);
                setClickedMarker(null);
                console.log(markers);
                console.log(selectedMarker);
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
            map.setLevel(4);
            map.setCenter(
              new kakao.maps.LatLng(
                mouseEvent.latLng.getLat(),
                mouseEvent.latLng.getLng()
              )
            );
            // setMarkers(markers);
          }}
          // ref={mapRef}
        >
          {markers.map((marker, index) => (
            // <MapMarker
            <EventMarkerContainer
              index={index}
              marker={marker}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                console.log(index);
                const map = mapRef.current;
                let markers = [];
                markers.push(marker);
                setInfo(marker);
                setSelectedMarker(markers);
                setClickedMarker(index);
                map.setLevel(4);
                map.setCenter(
                  new kakao.maps.LatLng(
                    marker.position.lat,
                    marker.position.lng
                  )
                );
                console.log(selectedMarker);
              }}
              isClicked={clickedMarker === index}
            >
              {/* {info && info.content === marker.content && ( */}
              {/* <MarkerInfo> */}
              {/* <span>선택위치</span>
                  <br /> */}
              {/* <span>{marker.content.placename}</span> */}
              {/* <br />
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
                  <span>{marker.content.place_url}</span> */}
              {/* </MarkerInfo> */}
              {/* )} */}
              {/* </MapMarker> */}
            </EventMarkerContainer>
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
        {/* <SearchWrapper> */}
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
        {/* </SearchWrapper> */}
        {/* <ResultText>
          장소명 <ResultKeyword>{KeyWord}</ResultKeyword> 검색결과
        </ResultText> */}
        <SearchResult id="search-result">
          {/* <div className="scroll-wrapper"> */}
          {markers.map((marker) => (
            <ScrollList
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              id="places-list"
              onClick={() => {
                const map = mapRef.current;
                let markers = [];
                markers.push(marker);
                setInfo(marker);
                setSelectedMarker(markers);
                console.log(selectedMarker);
                map.setLevel(4);
                map.setCenter(
                  new kakao.maps.LatLng(
                    marker.position.lat,
                    marker.position.lng
                  )
                );
              }}
            >
              {info && info.content !== marker.content && (
                <NotSelectedList>
                  <ListLine />
                  {/* <hr /> */}
                  <PlaceName>{marker.content.placename}</PlaceName>
                  {/* <h3>{marker.content.placename}</h3> */}
                  <br />
                  {marker.content.roadname ? (
                    <>
                      <RoadAddressName>
                        {marker.content.roadname}
                      </RoadAddressName>
                      {/* <span>{marker.content.roadname}</span> */}
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <AddressName>(지번){marker.content.addressname}</AddressName>
                  {/* <span>(지번){marker.content.addressname}</span> */}
                  <br />
                  <ListLine />
                  {/* {marker.content.phone ? (
                    <>
                      <span>{marker.content.phone}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{marker.content.place_url}</span> */}
                </NotSelectedList>
              )}
              {info && info.content === marker.content && (
                <SelectedList>
                  <SelectedListLine />
                  <PlaceName>{marker.content.placename}</PlaceName>
                  {/* <h3>{marker.content.placename}</h3> */}
                  <br />
                  {marker.content.roadname ? (
                    <>
                      <RoadAddressName>
                        {marker.content.roadname}
                      </RoadAddressName>
                      {/* <span>{marker.content.roadname}</span> */}
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <AddressName>(지번){marker.content.addressname}</AddressName>
                  {/* <span>(지번){marker.content.addressname}</span> */}
                  <br />
                  {/* {marker.content.phone ? (
                    <>
                      <span>{marker.content.phone}</span>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{marker.content.place_url}</span> */}
                  <SelectedListLine />
                </SelectedList>
              )}
            </ScrollList>
          ))}
          {/* </div> */}
          <PaginationBox id="pagination">
            <PaginationBox></PaginationBox>
          </PaginationBox>
          {/* <div id="pagination"></div> */}
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
        <ButtonList>
          <ButtonListBtn onClick={userLocation}>내위치</ButtonListBtn>
          {/* <ButtonListBtn onClick={nextStep}>다음</ButtonListBtn> */}
          <BeforeButton onClick={nextStep}>다음</BeforeButton>
        </ButtonList>
      </ListWrapper>
    </>
  );
};

export default Landing;
