import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MyPage() {
  const { state } = useLocation();
  console.log(state);
  // useEffect(() => {
  //   const userInfo = a
  // })

  return <div>Hi {state.name}쿤</div>;
}

export default MyPage;
