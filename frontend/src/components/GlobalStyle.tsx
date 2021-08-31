import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
    }
    body, html, #root{
        color:${(props) => props.theme.colors.fontColor};
        background: rgb(27,27,27);
        background: #202020;
        font-family: sans-serif;
        margin:0;
        padding:0;
        width:100%;
        height: 100%;
    }

`;
