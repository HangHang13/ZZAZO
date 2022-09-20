import React, { useEffect, useState } from "react";
import "./Bar.css";
import { useDispatch } from "react-redux";
import { storeSetUserProfile } from "../../../store/reducers/user";
import { storeSetRadius } from "../../../store/reducers/radius";

const Radius = ({}) => {
	useEffect(() => {
		dragElement(document.getElementById("circle"));
	});

	const [radius, setRadius] = useState(100);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeSetRadius(parseInt(radius)));
	}, [radius]);

	function dragElement(elmnt) {
		let clientX_gab = 0,
			clientX = 0;
		elmnt.onmousedown = dragMouseDown;
		elmnt.addEventListener("touchstart", dragMouseDown);
		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			elmnt.classList.add("s_on");
			if (e.changedTouches) {
				e.clientX = e.changedTouches[0].clientX;
			}
			clientX = e.clientX;
			document.onmouseup = closeDragElement;
			document.addEventListener("touchend", closeDragElement);
			document.onmousemove = elementDrag;
			document.addEventListener("touchmove", elementDrag);
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			if (e.changedTouches) {
				e.clientX = e.changedTouches[0].clientX;
			}
			clientX_gab = e.clientX - clientX;
			clientX = e.clientX;
			let leftVal = 0;
			let parentElmnt = elmnt.parentNode;
			if (elmnt.offsetLeft + clientX_gab < 0 || clientX < parentElmnt.offsetLeft) {
				leftVal = 0;
			} else if (elmnt.offsetLeft + clientX_gab > parentElmnt.clientWidth || clientX > parentElmnt.offsetLeft + parentElmnt.clientWidth) {
				leftVal = parentElmnt.clientWidth;
			} else {
				leftVal = elmnt.offsetLeft + clientX_gab;
			}

			let v = Math.round((leftVal / parentElmnt.clientWidth) * 1000) + 100;
			elmnt.querySelector("span").innerText = v + "m";
			setRadius(v);

			elmnt.style.left = leftVal + "px"; // 이 부분 수정해야 모바일에서도 매끄러움
		}

		function closeDragElement() {
			elmnt.classList.remove("s_on");
			document.onmouseup = null;
			document.removeEventListener("touchend", closeDragElement);
			document.onmousemove = null;
			document.removeEventListener("touchmove", elementDrag);
		}
	}

	return (
		<div className="seek-bar">
			<div id="circle" className="circle">
				<span>{radius}m</span>
			</div>
		</div>
	);
};

export default Radius;
