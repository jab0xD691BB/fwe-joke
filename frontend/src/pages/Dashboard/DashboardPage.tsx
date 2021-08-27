import React, { useState } from "react";
import styled from "styled-components/macro";
import { Modal } from "../../components/Modal";
import { AddJokeFormular } from "./components/AddJoke";
import { Joke, JokeItem } from "./components/JokesList";

const StyledButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const AddButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}></StyledButton>;
};

export const DashboardPage = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [countJokes, setcountJokes] = useState<Number>(0);
  const [addJokeVisible, setAddJokeVisible] = React.useState(false);

  const getJokesFromApi = async () => {
    console.log("send");
    const request = await fetch("/api/joke", {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokesJson = await request.json();
      setJokes(jokesJson.jokes);
      setcountJokes(jokesJson.jokes.length);
    }
  };

  React.useEffect(() => {
    getJokesFromApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={async () => {
          console.log("downlaod");
          await fetch("/api/download", {
            headers: { "content-type": "text/csv" },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "jokes.csv");
              document.body.appendChild(link);
              link.click();
              link.parentNode?.removeChild(link);
            });
          const link = document.createElement("a");
          //const jokesJson = await response.json();
        }}
      >
        Download
      </button>
      <AddButton
        onClick={() => {
          setAddJokeVisible(!addJokeVisible);
        }}
      />
      {addJokeVisible && (
        <Modal
          title={`Add Joke`}
          exitModal={() => {
            setAddJokeVisible(!addJokeVisible);
          }}
        >
          <AddJokeFormular
            afterSubmit={() => {
              getJokesFromApi();
              setAddJokeVisible(!addJokeVisible);
            }}
          />
        </Modal>
      )}
      <div
        css={`
          display: flex;
          flex-direction: column;
          width: 100%;
        `}
      >
        <div>
          {jokes.map((joke) => {
            return (
              <JokeItem
                afterUpdate={() => {
                  getJokesFromApi();
                }}
                key={joke.id}
                jokeItem={joke}
              ></JokeItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
