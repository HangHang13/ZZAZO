import React from "react";
import { Wrapper } from "../../components/styled/Wrapper";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TabItem from "../../components/mypage/TabItem";
const EditWrapper = styled.div`
  width: 100%;
  max-width: 61.25rem;
  min-height: 35.75rem;
  /* 53.75rem */
  margin: 6.25rem 5rem;
  background-color: white;
  border: 1px solid #80c0a0;
  border-radius: 3px;
  display: flex;
  height: 70%;
`;

const TabWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const EditorWrapper = styled.div`
  width: 80%;
  max-height: 860px;
  border-left: 1px solid #80c0a0;
  /* background-color: green; */
`;

const nestedLink = [
  {
    tabId: 1,
    title: "개인정보 변경",
    link: "update/profile",
  },
  {
    tabId: 2,
    title: "비밀번호 변경",
    link: "update/password",
  },
  {
    tabId: 3,
    title: "계정 삭제",
    link: "delete/profile",
  },
];

const MyPage = () => {
  return (
    <>
      {/* 헤더 */}
      <Wrapper color={"#ffffff"} alignItems="none">
        <EditWrapper>
          <TabWrapper>
            {nestedLink.map((item) => (
              <TabItem {...item} key={item.tabId} />
            ))}
          </TabWrapper>
          <EditorWrapper>
            <Outlet />
          </EditorWrapper>
        </EditWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
