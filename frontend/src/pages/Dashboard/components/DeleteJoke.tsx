import React, { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button";
import { Input, TextField } from "../../../components/Input";
import { Joke } from "./JokesList";
import { requestApi, requestOptions } from "./RequestApi";

const DeleteConfirmation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100px;
  width: 200px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  width: 70px;
  height: 70px;
`;

export const DeleteJoke: React.FC<{
  afterDelete: () => void;
  deleteJoke: Joke;
}> = ({ afterDelete, deleteJoke }) => {
  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const answer = e.currentTarget.value;
    if (answer === "yes") {
      let requestOptions: requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteJoke),
      };

      const path = `/api/joke/${deleteJoke.id}`;
      console.log(path);

      await fetch(path, requestOptions);
    }

    afterDelete();
  };

  return (
    <DeleteConfirmation>
      <ButtonWrapper>
        <Button value="yes" onClick={onClickHandler}>
          Yes
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button value="no" onClick={onClickHandler}>
          No
        </Button>
      </ButtonWrapper>
    </DeleteConfirmation>
  );
};
