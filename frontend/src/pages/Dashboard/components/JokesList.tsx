import React, { EventHandler, useState } from "react";
import styled from "styled-components/macro";
import { Modal } from "../../../components/Modal";
import { EditButton, DeleteButton, SmileyButton } from "./Button";
import { DeleteJoke } from "./DeleteJoke";
import { EditJokeFormular } from "./EditJoke";
import { requestApi } from "./RequestApi";

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

/*export type JokeListProp = {
  afterUpdate: () => void;
  jokesList: Joke[];
};

export const JokesList: React.FC<JokeListProp> = ({
  jokesList,
  afterUpdate,
}) => {
  console.log("newjoke", jokesList);
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
};*/

type JokeProp = {
  afterUpdate: () => void;
  jokeItem: Joke;
};

export const JokeItem: React.FC<JokeProp> = ({ afterUpdate, jokeItem }) => {
  const [smileHover, setSmileHover] = useState<Number>(jokeItem.funniness);
  const [isHovered, setIsHover] = useState<boolean>(false);
  const [editJokeVisible, setEditJokeVisible] = React.useState(false);
  const [confirmVisible, setConfirmVisible] = React.useState(false);

  const smileys = [];

  const smileyHandlerInParent = (e: React.MouseEvent, id: Number) => {
    setSmileHover(id);
    setIsHover(true);
  };

  for (let i = 1; i <= 10; i++) {
    smileys.push(
      <SmileyButton
        key={i}
        hover={
          i <= (isHovered ? smileHover : jokeItem.funniness) ? true : false
        }
        smileyId={i}
        smileyHandler={smileyHandlerInParent}
      ></SmileyButton>
    );
  }

  interface requestOptions {
    method: string;
    headers: {};
    body: string;
  }
  const onClickHandler = async () => {
    jokeItem.funniness = smileHover;
    let requestOptions: requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jokeItem),
    };

    const path = `/api/joke/${jokeItem.id}`;

    await fetch(path, requestOptions);
    afterUpdate();
  };

  return (
    <JokeLayout>
      <JokeHeader>
        <JokeTitel>{jokeItem.titel}</JokeTitel>
        <EditButton
          onClick={() => {
            setEditJokeVisible(!editJokeVisible);
          }}
        />
        <DeleteButton
          onClick={() => {
            setConfirmVisible(!confirmVisible);
          }}
        />
        {confirmVisible && (
          <Modal
            title={`Delete ${jokeItem.titel}?`}
            exitModal={() => {
              setConfirmVisible(!confirmVisible);
            }}
          >
            <DeleteJoke
              deleteJoke={jokeItem}
              afterDelete={() => {
                setConfirmVisible(!confirmVisible);
                afterUpdate();
              }}
            >
              test
            </DeleteJoke>
          </Modal>
        )}
      </JokeHeader>
      <JokeBody>{jokeItem.text}</JokeBody>
      {editJokeVisible && (
        <Modal
          title={`Edit ${jokeItem.titel}`}
          exitModal={() => {
            setEditJokeVisible(!editJokeVisible);
          }}
        >
          <EditJokeFormular
            editJoke={jokeItem}
            afterSubmit={() => {
              setEditJokeVisible(!editJokeVisible);
              afterUpdate();
            }}
          />
        </Modal>
      )}
      <JokeFooter
        onMouseLeave={() => {
          setSmileHover(jokeItem.funniness);
          setIsHover(false);
        }}
        onClick={onClickHandler}
      >
        {smileys}
      </JokeFooter>
    </JokeLayout>
  );
};
