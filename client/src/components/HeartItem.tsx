import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import UserApi from "../apis/userApi";

const HeartStyle = styled.span`
  height: 7%;
  font-size: 23px;
  cursor: pointer;
`;

interface HeartItemProps {
  lensId: number;
}

function HeartItem({ lensId }: HeartItemProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(); // 기본값이 false라서 찜목록 화면에서도 하트색이 풀려있는 모습

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const wishlist = await lensApi.getLensListByWishList();
      if (wishlist.some((w) => w.id === lensId)) {
        setState(true);
      } else {
        setState(false);
      }
    })();
  }, []);

  async function clickHeart() {
    //로그인 되어 있는지 체크
    const userApi = new UserApi();
    const loginCheck = await userApi.subscribeLens(lensId);
    if (!loginCheck) {
      alert("로그인되지 않았습니다");
      navigate("/signin");
    } else {
      //되어있다면
      if (typeof loginCheck !== "boolean") {
        setState(loginCheck.includes(lensId)); // 찜목록에서 하트색을 비우면 바로 사라지게 하는법은 wishlist에서 삭제 후 남은 리스트가 무엇인지 가져와서 화면에 보여줘야한다
      }
      console.log(loginCheck);
      // wishlist에 추가하기 --> 있으면 삭제 없으면 추가
    }
  }

  return <HeartStyle onClick={clickHeart}>{state ? <BsFillHeartFill /> : <BsHeart />}</HeartStyle>;
}

export default HeartItem;
