import React, { useState } from "react";
import axios from "axios";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LensMoreHeader from "../components/LensMoreHeader";

const LoginFormStyle = styled.form`
  width: 100%;
  height: 88%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .login-container {
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
    height: 50%;
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
      height: 35%;
      padding: 15px 10px 0;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
    }

    .pw-input {
      width: 100%;
      height: 35%;
      padding: 15px 10px 0;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
    }

    input::placeholder {
      color: #a0a0a0;
    }
  }

  .btn-signin {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: end;

    input {
      width: 100%;
      height: 60%;
      background-color: #fed2d9;
      color: #fffffd;
      font-weight: bold;
      border-radius: 5px;
      border: 1px solid #fed2d9;
      cursor: pointer;
    }
  }

  .btn-signup {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;

    button {
      width: 100%;
      height: 60%;
      background-color: #f2f2f2;
      color: #5f5f5f;
      font-weight: bold;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      cursor: pointer;
    }
  }
`;

function SignInPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      alert("아이디를 입력해주세요");
    }
    if (!userPassword) {
      alert("패스워드를 입력해주세요");
    }
    const res = await axios.post("/sign-in", { userId, userPassword });
    if (res.data) {
      navigate("/");
    } else {
      alert("등록되지 않은 회원입니다");
    }
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="로그인" />
        <LoginFormStyle onSubmit={login}>
          <div className="login-container">
            <LensMoreHeader />
            <div className="input-container">
              <span>아이디</span>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={userId}
                className="id-input"
                onChange={({ target }) => {
                  setUserId(target.value);
                }}
              />
              <span>비밀번호</span>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={userPassword}
                className="pw-input"
                onChange={({ target }) => setUserPassword(target.value)}
              />
            </div>
            <div className="btn-signin">
              <input type="submit" value="로그인" />
            </div>
            <div className="btn-signup">
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </div>
          </div>
        </LoginFormStyle>
      </div>
    </div>
  );
}

export default SignInPage;
