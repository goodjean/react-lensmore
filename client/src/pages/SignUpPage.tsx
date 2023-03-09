import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import styled from "styled-components";
import LensMoreHeader from "../components/LensMoreHeader";

const SignupFormStyle = styled.form`
  width: 100%;
  height: 88%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .signup-container {
    width: 96%;
    height: 87%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #e3e3e3;
    padding: 15px 20px;
  }

  .input-container {
    width: 100%;
    height: 70%;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 17px;

    span {
      font-size: 15px;
      font-weight: bold;
      color: darkgray;
      margin-top: 10px;
    }

    .id-input {
      width: 100%;
      height: 32%;
      padding: 15px 10px 0;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
    }

    .pw-input {
      width: 100%;
      height: 32%;
      padding: 15px 10px 0;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
    }

    .name-input {
      width: 100%;
      height: 32%;
      padding: 15px 10px 0;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
    }

    input::placeholder {
      color: #a0a0a0;
    }
  }

  .btn-signup {
    width: 100%;
    height: 28%;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 60%;
      background-color: #fed2d9;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      cursor: pointer;
      font-size: 17px;
    }
  }
`;

function SignUpPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  async function signup(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      alert("아이디를 입력해주세요");
    }
    if (!userPassword) {
      alert("패스워드를 입력해주세요");
    }
    if (!userName) {
      alert("이름을 입력해주세요");
    }

    const res = await axios.post("/sign-up", {
      userId,
      userPassword,
      userName,
    });

    console.log(res.data);
    if (res.data) {
      navigate("/signin");
    } else {
      alert("아이디가 중복됩니다.");
    }
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="회원가입" />
        <SignupFormStyle onSubmit={signup}>
          <div className="signup-container">
            <LensMoreHeader />
            <div className="input-container">
              <span>아이디</span>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                className="id-input"
                value={userId}
                onChange={({ target }) => setUserId(target.value)}
              />
              <span>비밀번호</span>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="pw-input"
                value={userPassword}
                onChange={({ target }) => setUserPassword(target.value)}
              />
              <span>이름</span>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                className="name-input"
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
              />
            </div>
            <div className="btn-signup">
              <input type="submit" value="회원가입하기" />
            </div>
          </div>
        </SignupFormStyle>
      </div>
    </div>
  );
}

export default SignUpPage;
