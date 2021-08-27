import { Joke } from "./JokesList";

export interface requestOptions {
  method: string;
  headers: {};
  body: string;
}

export const requestApi = async (joke: Joke, crudMethod: string) => {
  let requestOptions: requestOptions = {
    method: crudMethod,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(joke),
  };

  const path = `/api/joke/${crudMethod === "PUT" || "DELETE" ? joke.id : ""}`;
  console.log(path);

  await fetch(path, requestOptions);
};
