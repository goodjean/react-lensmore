import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserApi from "../apis/userApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import styled from "styled-components";

const MyPageStyle = styled.div`
  // background-color: pink;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  padding-top: 35px;

  .mypage-container {
    // background-color: yellow;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
  }

  .userinfo-container {
    // background-color: red;
    width: 100%;
    height: 65%;
    display: flex;
  }

  .profile-icon {
    // background-color: purple;
    width: 39%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }

  .userInfo-desc {
    // background-color: blue;
    width: 61%;
    height: 100%;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    span {
      color: gray;
      font-weight: bold;
      font-size: 15px;
    }

    .id-info {
      // background-color: pink;
      width: 100%;
      height: 50%;
      padding: 13px 8px;
    }

    .name-info {
      // background-color: orange;
      width: 100%;
      height: 50%;
      padding: 13px 8px;
    }
  }

  .btn-logout {
    // background-color: green;
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
      width: 100%;
      height: 56%;
      border-radius: 5px;
      background-color: #282828;
      color: white;
      font-weight: bold;
      font-size: 17px;
    }
  }
`;

function MyPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState<{ id: string; name: string }>();

  useEffect(() => {
    (async () => {
      const userApi = new UserApi();
      const userInfoEntity = await userApi.getUserInfo(state);
      setUserInfo(userInfoEntity);
    })();
  }, [state]);

  async function logout() {
    const userApi = new UserApi();
    const res = await userApi.logout();
    if (res) {
      navigate("/");
    } else {
      alert("로그아웃에 실패하였습니다.");
    }
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="마이페이지" />
        <MyPageStyle>
          <div className="mypage-container">
            <section className="userinfo-container">
              <div className="profile-icon">
                <img src="/user.png" alt="profile" />
              </div>
              <div className="userInfo-desc">
                <div className="id-container">
                  <span>아이디</span>
                  <h3 className="id-info">{userInfo?.id}</h3>
                </div>
                <div className="name-container">
                  <span>이름</span>
                  <h3 className="name-info">{userInfo?.name}</h3>
                </div>
              </div>
            </section>
            <div className="btn-logout">
              <button onClick={logout}>로그아웃</button>
            </div>
          </div>
        </MyPageStyle>
      </div>
    </div>
  );
}

export default MyPage;
