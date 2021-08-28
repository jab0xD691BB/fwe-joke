import React, { useRef } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border-width: 0px;
  margin-bottom: 2px;
  position: relative;
`;

const InputLabeStyle = styled.label`
  position: absolute;
  left: 4px;
  top: 25px;
`;

const InputStyle = styled.input`
  color: white;
  background-color: #202020;
  outline-width: 0px;
  border-width: 0;
  border-radius: 4px;
  height: 60px;
  font-size: 1.3rem;
  text-align: left;
  padding-left: 8px;
  padding: 2px 0 0 8px;
  &:focus + ${InputLabeStyle} {
    transform: matrix(0.8, 0, 0, 0.8, -2, -20.75);
  }
  &:not(:placeholder-shown) + ${InputLabeStyle} {
    transform: matrix(0.8, 0, 0, 0.8, -2, -20.75);
  }
`;

export const TextFieldStyle = styled.textarea`
  color: white;
  background-color: #202020;
  outline-width: 0px;
  border-width: 0;
  border-radius: 4px;
  height: 100px;
  width: 100%;
  font-size: 1rem;
  resize: none;
  &:focus + ${InputLabeStyle} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${InputLabeStyle} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  padding-top: 17px;
  padding-left: 10px;
  overflow: hidden;
`;

export const Input = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  type?: "text" | "number";
}) => {
  const id = useRef(`${label}-${Math.floor(Math.random() * 10000)}`);

  return (
    <InputWrapper>
      <InputStyle {...props} id={id.current} placeholder=" " />
      <InputLabeStyle htmlFor={id.current}>{label}</InputLabeStyle>
    </InputWrapper>
  );
};

export const TextField = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  type: "text";
}) => {
  const id = useRef(`${label}-${Math.floor(Math.random() * 10000)}`);

  return (
    <InputWrapper>
      <TextFieldStyle {...props} id={id.current} placeholder=" " />
      <InputLabeStyle htmlFor={id.current}>{label}</InputLabeStyle>
    </InputWrapper>
  );
};
