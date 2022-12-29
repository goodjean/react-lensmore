import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";

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

    if (res) {
      navigate("/signin");
    } else {
      alert("아이디가 중복됩니다.");
    }
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="회원가입" />
        <form onSubmit={signup}>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={({ target }) => setUserId(target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={userPassword}
            onChange={({ target }) => setUserPassword(target.value)}
          />
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
          <input type="submit" value="sign up" />
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
