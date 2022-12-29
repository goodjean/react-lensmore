import React, { useState } from "react";
import axios from "axios";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={({ target }) => {
              setUserId(target.value);
            }}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={userPassword}
            onChange={({ target }) => setUserPassword(target.value)}
          />
          <input type="submit" value="log in" />
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
