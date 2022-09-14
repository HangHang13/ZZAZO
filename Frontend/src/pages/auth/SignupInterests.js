import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NumberCircle from "../../components/auth/NumberCircle";
import InterestsList from "../../components/auth/signup/InterestsList";
import { ProgressBlock, ProgressDescription, SignupBody, SignupHeader } from "../../components/auth/signup/Signup";
import { MobileSizeWrapper, Wrapper } from "./../../components/styled/Wrapper";
import DivButton from "./../../components/common/buttons/DivButton";
import { client } from "./../../utils/client";

// 임시 interests 더미데이터
const intList = [
	{
		mainCategoryId: 0,
		subCategoryId: 0,
		categoryName: "한식",
		icon: "fa-light fa-bowl-food",
	},
	{
		mainCategoryId: 0,
		subCategoryId: 1,
		categoryName: "일식",
		icon: "fa-light fa-bowl-food",
	},
	{
		mainCategoryId: 0,
		subCategoryId: 2,
		categoryName: "중식",
		icon: "fa-light fa-bowl-food",
	},
	{
		mainCategoryId: 0,
		subCategoryId: 3,
		categoryName: "양식",
		icon: "fa-light fa-bowl-food",
	},
	{
		mainCategoryId: 0,
		subCategoryId: 4,
		categoryName: "치킨",
		icon: "fa-light fa-bowl-food",
	},
];

const InterestsWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`;

const InterestsHeader = styled.div`
	display: flex;
	text-align: center;
	justify-content: center;
	padding-top: 1rem;
	padding-bottom: 1rem;
	font-size: 1.5rem;
	font-weight: bold;
	border-bottom: 2px solid grey;
`;

const SignupInterests = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [form, setForm] = useState(state); // form.userCategory = []

	const onHandleInterestClick = (categoryName) => {
		if (form.userCategory.includes(categoryName)) {
			// userCategory 안에 클릭한 카테고리가 있으면
			setForm({ ...form, userCategory: form.userCategory.filter((item) => item !== categoryName) });
		} else {
			// userCategory 안에 클릭한 카테고리가 없으면
			setForm({ ...form, userCategory: [...form.userCategory, categoryName] });
		}
	};

	function concatCategories() {
		return new Promise(function (resolve, reject) {
			let categoryStr = "";
			form.userCategory.map((item) => {
				categoryStr.concat(item).concat(",");
			});
			resolve(categoryStr);
		}).then((str) => {
			setForm({ ...form, userCategory: str });
		});
	}

	const submitForm = async () => {
		if (!confirm("가입을 완료하시겠습니까?")) {
			return;
		}

		// category 전부 이어붙이기!
		await concatCategories();
		console.log("aaa => " + form.userCategory);

		// const response = client.post(`/auth/signup`, {
		// 	userEmail: form.userEmail,
		// 	userName: form.userName,
		// 	userPassword: form.userPassword,
		// 	userNickname: form.userNickname,
		// 	userName: form.userName,
		// 	userPhone: form.userPhone,
		// 	userBirth: form.userBirth,
		// 	userGender: parseInt(form.userGender),
		// 	userCategory: form.userCategory,
		// });

		const response = {
			code: 200,
		};

		if (response.code === 200) {
			alert("회원가입이 완료되었습니다.");
			navigate("/");
			console.log(form.userCategory);
		} else {
			alert("회원가입에 실패했습니다.");
		}
	};

	useEffect(() => {
		if (state === null) {
			alert("비정상적인 접근입니다.");
			navigate("/");
		}
	}, []);

	return (
		<Wrapper>
			<MobileSizeWrapper>
				<SignupHeader>
					<ProgressBlock>
						<NumberCircle color="#C0F0B0" number="1" />
						<ProgressDescription>회원정보 입력</ProgressDescription>
					</ProgressBlock>
					<ProgressBlock>
						<NumberCircle color="#C0F0B0" number="2" />
						<ProgressDescription>관심정보 입력</ProgressDescription>
					</ProgressBlock>
				</SignupHeader>
				<SignupBody>
					<InterestsWrapper>
						<InterestsHeader>식사</InterestsHeader>
						<InterestsList intList={intList} onHandleInterestClick={onHandleInterestClick} />
					</InterestsWrapper>
					<InterestsWrapper>
						<InterestsHeader>카페 / 주류</InterestsHeader>
						<InterestsList intList={intList} onHandleInterestClick={onHandleInterestClick} />
					</InterestsWrapper>
					<InterestsWrapper>
						<InterestsHeader>게임 / 놀거리</InterestsHeader>
						<InterestsList intList={intList} onHandleInterestClick={onHandleInterestClick} />
					</InterestsWrapper>
					<InterestsWrapper>
						<InterestsHeader>관람</InterestsHeader>
						<InterestsList intList={intList} onHandleInterestClick={onHandleInterestClick} />
					</InterestsWrapper>
					<InterestsWrapper>
						<InterestsHeader>걷기</InterestsHeader>
						<InterestsList intList={intList} onHandleInterestClick={onHandleInterestClick} />
					</InterestsWrapper>
				</SignupBody>
				<DivButton message="완 료" width="100%" borderColor="#80E080" color="#80C0A0" clickEvent={() => submitForm()}></DivButton>
			</MobileSizeWrapper>
		</Wrapper>
	);
};

export default SignupInterests;
