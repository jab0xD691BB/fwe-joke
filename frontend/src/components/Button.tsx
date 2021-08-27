import React, { useRef } from "react";
import styled from "styled-components";

export const Button = styled.button`
  background-color: green;
  border: 0px;
  width: 100%;
  border-radius: 10px;
  transition-duration: 250ms;
  line-height: 50px;
  &:hover {
    background-color: #50e150;
  }
`;
