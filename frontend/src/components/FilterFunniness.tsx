import React, { useRef } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  border-radius: 4px;
  border-width: 1px;
  width: 70px;
  background-color: #e0b3e4ec;
  margin-right: 15px;
`;

const InputLabeStyle = styled.label``;

const InputStyle = styled.input`
  background-color: #e0b3e4ec;
  outline-width: 0px;
  font-size: 1.2em;
  text-align: left;
  width: 50px;
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
