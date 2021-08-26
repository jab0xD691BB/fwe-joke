import React, { useState } from "react";
import styled from "styled-components/macro";
import { JokesList, Joke } from "./components/JokesList";

const StyledButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const AddButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  console.log(props);
  return <StyledButton {...props}></StyledButton>;
};

export const DashboardPage = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [countJokes, setcountJokes] = useState<Number>(0);

  const getJokesFromApi = async () => {
    const request = await fetch("/api/joke", {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokesJson = await request.json();
      setJokes(jokesJson.jokes);
      setcountJokes(jokesJson.jokes.length);
      console.log("jokesResponse", jokesJson.jokes);
    }
    console.log("jokes", jokes);
  };

  React.useEffect(() => {
    getJokesFromApi();
  }, []);

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <div>{"countJokes: " + countJokes}</div>
      <AddButton />
      <JokesList
        jokesList={jokes}
        afterUpdate={() => {
          console.log("someone updated");
          getJokesFromApi();
        }}
      ></JokesList>
    </div>
  );
};
