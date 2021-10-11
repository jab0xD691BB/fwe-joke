import React, { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button";
import { Input, TextField } from "../../../components/Input";
import { Joke } from "./JokesList";
import { requestOptions } from "./RequestApi";

const JokeFormular = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 400px;
  padding: 10px;
`;

export const AddJokeFormular: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  let jk: Joke = {
    id: "",
    titel: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    visible: true,
    funniness: 0,
  };

  const [joke, setJoke] = useState<Joke>(jk);

  const onSubMitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let requestOptions: requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(joke),
    };

    const path = `/api/jokes/`;

    await fetch(path, requestOptions);
    afterSubmit();
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJoke({
      id: "",
      titel: e.target.name === "titel" ? e.target.value : joke.titel,
      text: e.target.name === "text" ? e.target.value : joke.text,
      createdAt: "",
      updatedAt: "",
      visible: true,
      funniness: 0,
    });
  };

  return (
    <JokeFormular>
      <form onSubmit={onSubMitForm}>
        <Input
          label="Titel"
          name="titel"
          type="text"
          onChange={onChangeHandler}
          required
          minLength={3}
          value={joke.titel}
        />
        <TextField
          label="Text"
          name="text"
          type="text"
          onChange={onChangeHandler}
          required
          minLength={3}
          value={joke.text}
        />
        <Button type="submit">Add Joke</Button>
      </form>
    </JokeFormular>
  );
};
