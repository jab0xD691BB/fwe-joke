import React, { useState } from "react";
import styled from "styled-components/macro";
import { Modal } from "../../../components/Modal";
import { EditButton, DeleteButton, SmileyButton } from "./Button";
import { DeleteJoke } from "./DeleteJoke";
import { EditJokeFormular } from "./EditJoke";

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
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  border-radius: 7px;
  height: 120px;
  width: 80%;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  &:hover,
  &:focus {
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.2);
  }
  position: relative;
`;

const JokeHeader = styled.div`
  display: flex;
  direction: row;
`;

const JokeTitel = styled.p`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
`;

const JokeBody = styled.div`
  font-size: 1rem;
  padding: 10px 25px 10px 25px;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const JokeFooter = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

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
        <div
          css={`
            display: flex;
            position: absolute;
            right: 0px;
          `}
        >
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
        </div>
        {confirmVisible && (
          <Modal
            title={`Delete ${jokeItem.titel}?`}
            exitModal={() => {
              setConfirmVisible(!confirmVisible);
            }}
          >
            <DeleteJoke
              deleteJoke={jokeItem}
              responseYes={() => {
                setConfirmVisible(!confirmVisible);
                afterUpdate();
              }}
              responseNo={() => {
                setConfirmVisible(!confirmVisible);
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
