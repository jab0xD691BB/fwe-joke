import React, { useState } from "react";
import styled from "styled-components/macro";
import { InputFunniness } from "../../components/FilterFunniness";
import { AddImg, DownloadImg, SmileyImg } from "../../images/Images";
import { Modal } from "../../components/Modal";
import { AddJokeFormular } from "./components/AddJoke";
import { Joke, JokeItem } from "./components/JokesList";

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;
  width: 90%;
`;

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0px;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  &:hover,
  &:focus {
    transform: scale(1.2, 1.2);
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.2);
  }
`;
const StyledSelect = styled.select`
  background-color: ${(props) => props.theme.colors.jokeItemColor};
  height: 30px;
  border: 0px;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  &:hover,
  &:focus {
    outline: 0px;
  }
`;

const DownloadButton = styled.button`
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.jokeItemColor};
`;

export const DashboardPage = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [addJokeVisible, setAddJokeVisible] = React.useState(false);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(10);

  const getJokesFromApi = async () => {
    const request = await fetch("/api/joke", {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokesJson = await request.json();
      setJokes(jokesJson.jokes);
    }
  };

  const getJokesFromApiWithParams = async (min: Number, max: Number) => {
    const request = await fetch(`/api/joke/?min_fun=${min}&max_fun=${max}`, {
      headers: { "content-type": "application/json" },
    });

    if (request.status === 200) {
      const jokesJson = await request.json();
      setJokes(jokesJson.jokes);
    }
  };

  React.useEffect(() => {
    getJokesFromApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    if (sortType === "ascending") {
      setJokes((jokes) =>
        [...jokes].sort((a, b) =>
          Number(a.funniness) < Number(b.funniness) ? 1 : -1
        )
      );
    } else {
      setJokes((jokes) =>
        [...jokes].sort((a, b) =>
          Number(a.funniness) > Number(b.funniness) ? 1 : -1
        )
      );
    }
  };

  return (
    <div>
      <StyledDiv>
        <SmileyImg />
        <InputFunniness
          label="min"
          name="funniness"
          type="number"
          required
          min={0}
          max={10}
          defaultValue={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMinValue(Number(e.target.value));
            if (minValue >= maxValue) {
              e.target.value = "" + maxValue;
            }
            getJokesFromApiWithParams(Number(e.target.value), maxValue);
          }}
        />
        <InputFunniness
          label="max"
          name="funniness"
          type="number"
          required
          min={0}
          max={10}
          defaultValue={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMaxValue(Number(e.target.value));
            if (minValue >= maxValue) {
              e.target.value = "" + minValue;
            }
            getJokesFromApiWithParams(minValue, Number(e.target.value));
          }}
        />
        <div
          css={`
            border-left: 1px solid white;
            height: 40px;
            margin-left: 10px;
            margin-right: 10px;
          `}
        ></div>
        <StyledSelect onChange={selectChangeHandler} name="cars" id="cars">
          <option value="ascending">Jokes ascending</option>
          <option value="descending">Jokes descending</option>
        </StyledSelect>
        <StyledButton
          onClick={async () => {
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
            //const jokesJson = await response.json();
          }}
        >
          <DownloadImg />
        </StyledButton>
        <StyledButton
          onClick={() => {
            if (!addJokeVisible) {
              setAddJokeVisible(!addJokeVisible);
            }
          }}
        >
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
                  console.log("exit modal");
                }}
              />
            </Modal>
          )}
          <AddImg />
        </StyledButton>
      </StyledDiv>
      <div
        css={`
          display: flex;
          flex-direction: column;
          width: 100%;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          {jokes.map((joke) => {
            return joke.funniness >= minValue && joke.funniness <= maxValue ? (
              <JokeItem
                afterUpdate={() => {
                  getJokesFromApi();
                }}
                key={joke.id}
                jokeItem={joke}
              ></JokeItem>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};
