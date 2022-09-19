import React, { useState } from "react";
import styled from "styled-components";
import SelectMapContainer from "./SelectMapContainer";

const InputForm = styled.form`
  display: flex;
`;
const SearchInputText = styled.input`
  display: flex;
`;
const SearchButton = styled.button`
  display: flex;
`;
const SelectSearchLanding = () => {
  const [searchInput, setSearchInput] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setPlace(searchInput);
    setSearchInput("");
  };
  return (
    <>
      <InputForm onSubmit={onHandleSubmit}>
        <SearchInputText
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={searchInput}
        />
        <SearchButton type="submit">검색</SearchButton>
      </InputForm>
      <SelectMapContainer searchPlace={place} />
    </>
  );
};

export default SelectSearchLanding;
