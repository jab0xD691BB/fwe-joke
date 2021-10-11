import React, { useState } from "react";
import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import { AddImg } from "../../images/Images";
import { JokeItem, Joke } from "../Dashboard/components/JokesList";
import { StyledButton } from "../Dashboard/DashboardPage";

const RandomJokeLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
`;

export const RandomJokePage = () => {
  const [joke, setJoke] = useState<Joke>();

  const getRandomJokeFromApi = async () => {
    const request = await fetch("/api/jokeExternal", {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokeJson = await request.json();
      setJoke(jokeJson.data);
    }
  };

  const updateJoke = async () => {
    const request = await fetch(`/api/jokes/${joke?.id}`, {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokeJson = await request.json();
      console.log(jokeJson);
      setJoke(jokeJson);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RandomJokeLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          width: "90%",
        }}
      >
        <StyledButton onClick={getRandomJokeFromApi}>
          <AddImg />
        </StyledButton>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {joke !== undefined && (
          <JokeItem
            jokeItem={joke}
            afterUpdate={(crud) => {
              if (crud === "delete") {
                setJoke(undefined);
              } else {
                updateJoke();
              }
            }}
          ></JokeItem>
        )}
      </div>
    </RandomJokeLayout>
  );
};
