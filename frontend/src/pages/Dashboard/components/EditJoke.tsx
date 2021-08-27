import React, { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button";
import { Input, TextField } from "../../../components/Input";
import { Joke } from "./JokesList";
import { requestApi, requestOptions } from "./RequestApi";

const JokeFormular = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
  padding: 10px;
`;

export const EditJokeFormular: React.FC<{
  afterSubmit: () => void;
  editJoke: Joke;
}> = ({ afterSubmit, editJoke }) => {
  let jk: Joke = {
    id: "",
    titel: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    visible: true,
    funniness: 0,
  };

  const [joke, setJoke] = useState<Joke>(editJoke);

  const onSubMitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let requestOptions: requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(joke),
    };

    const path = `/api/joke/${joke.id}`;
    console.log(path);

    await fetch(path, requestOptions);
    afterSubmit();
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJoke({
      id: joke.id,
      titel: e.target.name === "titel" ? e.target.value : joke.titel,
      text: e.target.name === "text" ? e.target.value : joke.text,
      createdAt: "",
      updatedAt: "",
      visible: true,
      funniness:
        e.target.name === "funniness" ? Number(e.target.value) : joke.funniness,
    });
  };

  return (
    <JokeFormular>
      <form onSubmit={onSubMitForm}>
        <Input
          label="Titel"
          name="titel"
          type="text"
          autoComplete="off"
          onChange={onChangeHandler}
          required
          minLength={3}
          value={joke.titel}
        />
        <TextField
          label="Text"
          name="text"
          type="text"
          autoComplete="off"
          onChange={onChangeHandler}
          required
          minLength={3}
          value={joke.text}
        />
        <Input
          label="Funniness"
          name="funniness"
          type="number"
          autoComplete="off"
          onChange={onChangeHandler}
          required
          min={0}
          max={10}
          value={joke.funniness.toString()}
        />
        <Button type="submit">Edit</Button>
      </form>
    </JokeFormular>
  );
};