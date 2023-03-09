import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LensMoreHeaderStyle = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  line-height: 1.6;
  margin-top: 10px;
  padding-top: 8px;

  h1 {
    margin: 0;
    @import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
    font-family: "PT Sans", sans-serif;
    color: #505050;
    font-weight: normal;
    font-size: 35px;
    cursor: pointer;
  }

  p {
    @import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
    font-family: "PT Sans", sans-serif;
    color: #505050;
    font-weight: bold;
  }
`;

function LensMoreHeader() {
  const navigate = useNavigate();
  return (
    <LensMoreHeaderStyle className="login-header">
      <h1 onClick={() => navigate("/")}>LensMore</h1>
      <p>렌즈 모아보기는 여기서.</p>
    </LensMoreHeaderStyle>
  );
}

export default LensMoreHeader;
