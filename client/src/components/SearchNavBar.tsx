import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const SearchNavBarContainer = styled.form`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0px;
  background-color: white;

  nav {
    cursor: pointer;
  }

  button {
    border: 0;
    outline: 0;
    background: white;
    cursor: pointer;
  }

  .inp-bx {
    width: 78%;
    height: 65px;
    padding: 18px 18px;
    border: 0;
    border-radius: 12px;
    outline: none;
    color: #222;
    background-color: #f1f1f1;
    font-size: 20px;

    &::placeholder {
      color: #aeaeae;
    }
  }
`;

function SearchNavBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!keyword) {
      return;
    } else {
      navigate(`/search/results/${keyword}`);
    }
  }

  return (
    <SearchNavBarContainer onSubmit={submit}>
      <nav onClick={() => navigate(-1)}>
        <IoIosArrowBack size={29} />
      </nav>
      <input type="text" placeholder="검색어를 입력해 주세요" className="inp-bx" value={keyword} onChange={change} />
      <button>
        <AiOutlineSearch size={29} />
      </button>
    </SearchNavBarContainer>
  );
}

export default SearchNavBar;
