import React, { useState } from "react";
import styled from "styled-components/macro";
import { theme } from "../../../theme";
import { EditButton, DeleteButton, SmileyButton } from "./Button";
import { requestApi } from "./UpdateFunniness";

export type Joke = {
  id: string;
  titel: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  visible: boolean;
  funniness: Number;
};

const JokeLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  border-radius: 7px;
  margin-bottom: 3px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const JokeHeader = styled.div`
  display: flex;
  direction: row;
`;

const JokeTitel = styled.p`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  padding-left: 48px;
`;

const JokeBody = styled.p`
  width: 100%;
  font-size: 1rem;
  padding: 10px 0 10px 0;
  margin: 0;
  text-align: center;
`;

const JokeFooter = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

export type JokeListProp = {
  afterUpdate: () => void;
  jokesList: Joke[];
};

export const JokesList: React.FC<JokeListProp> = ({
  jokesList,
  afterUpdate,
}) => {
  console.log("jokesList", jokesList);
  return (
    <div css={``}>
      {jokesList.map((joke) => {
        return (
          <JokeItem
            afterUpdate={afterUpdate}
            key={joke.id}
            jokeItem={joke}
          ></JokeItem>
        );
      })}
    </div>
  );
};

type JokeProp = {
  afterUpdate: () => void;
  jokeItem: Joke;
};

const JokeItem: React.FC<JokeProp> = ({ jokeItem, afterUpdate }) => {
  console.log("funniness: ", jokeItem.funniness);
  const [joke, setJoke] = useState<Joke>(jokeItem);
  const [smileHover, setSmileHover] = useState<Number>(jokeItem.funniness);
  const smileys = [];
  const smileyHandlerInParent = (e: React.MouseEvent, id: Number) => {
    setSmileHover(id);
  };

  for (let i = 1; i <= 10; i++) {
    smileys.push(
      <SmileyButton
        hover={i <= smileHover ? true : false}
        smileyId={i}
        smileyHandler={smileyHandlerInParent}
      ></SmileyButton>
    );
  }

  return (
    <JokeLayout>
      <JokeHeader>
        <JokeTitel>{jokeItem.titel}</JokeTitel>
        <EditButton />
        <DeleteButton />
      </JokeHeader>
      <JokeBody>{jokeItem.text}</JokeBody>
      <JokeFooter
        onMouseLeave={() => {
          setSmileHover(joke.funniness);
        }}
        onClick={() => {
          joke.funniness = smileHover;
          setJoke(joke);
          requestApi(jokeItem);
          afterUpdate();
        }}
      >
        {smileys}
      </JokeFooter>
    </JokeLayout>
  );
};
