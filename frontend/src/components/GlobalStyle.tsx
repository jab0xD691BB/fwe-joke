import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
    }
    body, html{
        color:${(props) => props.theme.colors.fontColor};
        background: rgb(27,27,27);
background: linear-gradient(0deg, rgba(27,27,27,1) 85%, rgba(52,52,52,1) 100%);
        font-family: sans-serif;
        margin:0;
        padding:0;
        width:100%;
    }

`;
