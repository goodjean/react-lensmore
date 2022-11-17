import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .wrap {
    width: 100%;
    height: 100%;
    // background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }

  .wrap-inner {
    width: 35%;
    // min-width: 493px; (before px)
    min-width: 600px;
    height: 100%;
    // background-color: white;
  }  
`;

export default GlobalStyle;
