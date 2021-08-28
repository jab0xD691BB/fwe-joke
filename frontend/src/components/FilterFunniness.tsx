import React, { useRef } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  margin-left: 10px;
  height: 30px;
`;

const InputLabeStyle = styled.label`
  padding-right: 2px;
`;

const InputStyle = styled.input`
  color: white;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  outline-width: 0px;
  font-size: 1.2em;
  text-align: left;
  width: 50px;
  border-radius: 4px;
  border: 0px;
`;

export const InputFunniness = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  type: "number";
}) => {
  const id = useRef(`${label}-${Math.floor(Math.random() * 10000)}`);

  return (
    <InputWrapper>
      <InputLabeStyle htmlFor={id.current}>{label}</InputLabeStyle>
      <InputStyle {...props} id={id.current} placeholder=" " />
    </InputWrapper>
  );
};
