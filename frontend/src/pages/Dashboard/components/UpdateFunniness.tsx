import { async } from "q";
import React from "react";
import { Joke } from "./JokesList";

interface requestOptions {
  method: string;
  headers: {};
  body: string;
}

export const requestApi = async (joke: Joke) => {
  let requestOptions: requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(joke),
  };

  return await fetch(`/api/joke/${joke.id}`, requestOptions);
};
