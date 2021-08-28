import { RequestHandler } from "express";
import fetch from "node-fetch";
import { getRepository, Repository } from "typeorm";
import { Joke } from "../entity/joke.model";

type GetAllJokesResponseBody = {
  jokes: Joke[];
};

type CreateJoke = Omit<Joke, "id">;

export const getJokeFromExternalApi: RequestHandler<
  {},
  {} /*GetAllJokesResponseBody*/
> = async (req, res) => {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Any?type=single&idRange=1-300",
    { method: "GET" }
  ); //oder POST

  const jokes = await response.json();

  const jokeRepository: Repository<Joke> = getRepository(Joke);

  console.log(jokes);

  let createdJoke: any;
  let newJoke: CreateJoke = {
    titel: jokes.category + " Joke",
    text: jokes.joke,
  };

  createdJoke = await jokeRepository
    .findOneOrFail({ titel: "test", text: jokes.joke })
    .catch(async () => {
      return await jokeRepository.save(newJoke).catch(() => {});
    });

  res.send({ status: "ok", data: createdJoke });
};

/*jokes.map(async (joke: any)  => {
        let newJoke: CreateJoke = { titel: "test", text: joke.joke};

        await jokeRepository.findOneOrFail({titel: "test", text: joke.joke}).then( () =>{
            console.log("joke already exist.\n"+joke.joke);

        }).catch(async () => {

            console.log(await jokeRepository.save(newJoke).catch(() => {}));
            
        });

    });*/
