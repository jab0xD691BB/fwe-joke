import React from "react";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  width: 32px;
  height: 26px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  border-bottom: 0.9px solid rgba(70, 60, 100, 1);
  border-top-right-radius: 7px;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColor};
  }
`;

const StyledEditButton = styled.button`
  width: 32px;
  height: 26px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  border-bottom: 0.9px solid rgba(70, 60, 100, 1);
  border-left: 0.9px solid rgba(70, 60, 100, 1);
  border-bottom-left-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColor};
  }
`;

export const EditButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledEditButton {...props}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
      </svg>
    </StyledEditButton>
  );
};

export const DeleteButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledDeleteButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ fill: "#ff0000", height: "24px", width: "24px" }}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
      </svg>
    </StyledDeleteButton>
  );
};

interface SmileyProps {
  hover: boolean;
  smileyId: Number;
  smileyHandler: (e: React.MouseEvent, id: Number) => void;
}

export const SmileyButton: React.FC<SmileyProps> = ({
  smileyHandler,
  smileyId,
  hover,
}) => {
  const smileId: Number = smileyId;
  return (
    <svg
      id={"" + smileyId}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      width="18px"
      viewBox="0 0 20 20"
      fill={hover ? "yellow" : "#000000"}
      onMouseEnter={(e) => {
        smileyHandler(e, smileId);
      }}
    >
      <g>
        <rect fill="none" height="20" width="20" x="0" />
      </g>
      <g>
        <g />
        <g>
          <path d="M10,14c1.86,0,3.41-1.28,3.86-3H6.14C6.59,12.72,8.14,14,10,14z" />
          <path d="M9.99,3C6.13,3,3,6.14,3,10s3.13,7,6.99,7c3.87,0,7.01-3.14,7.01-7S13.86,3,9.99,3z M9.99,16C6.69,16,4,13.31,4,10 s2.69-6,5.99-6C13.31,4,16,6.69,16,10S13.31,16,9.99,16z" />
          <circle cx="13" cy="8" r="1" />
          <circle cx="7" cy="8" r="1" />
        </g>
      </g>
    </svg>
  );
};
