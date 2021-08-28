import React, { useState } from "react";
import styled from "styled-components/macro";
import { InputFunniness } from "../../components/FilterFunniness";
import { Modal } from "../../components/Modal";
import { AddJokeFormular } from "./components/AddJoke";
import { Joke, JokeItem } from "./components/JokesList";

const StyledButton = styled.button`
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
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(10);

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

  const getJokesFromApiWithParams = async (min: Number, max: Number) => {
    console.log("send");
    const request = await fetch(`/api/joke/?min_fun=${min}&max_fun=${max}`, {
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

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const sortType = e.target.value;
    const jk = jokes;
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
      <div
        css={`
          display: flex;
          justify-content: flex-end;
          height: 30px;
          margin-bottom: 20px;
        `}
      >
        <InputFunniness
          label="min"
          name="funniness"
          type="number"
          required
          min={0}
          max={10}
          defaultValue={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("min", Number(e.target.value));
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
            console.log("max", Number(e.target.value));
            setMaxValue(Number(e.target.value));
            if (minValue >= maxValue) {
              e.target.value = "" + minValue;
            }
            getJokesFromApiWithParams(minValue, Number(e.target.value));
          }}
        />
        <select onChange={selectChangeHandler} name="cars" id="cars">
          <option value="ascending">Jokes ascending</option>
          <option value="descending">Jokes descending</option>
        </select>
        <button
          onClick={async () => {
            console.log("download");
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
      </div>
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
