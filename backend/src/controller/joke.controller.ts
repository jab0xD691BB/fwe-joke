import { RequestHandler } from "express";
import { Between, getRepository, Repository } from "typeorm";
import { Joke, jokeSchema } from "../entity/joke.model";



type GetAllJokesResponseBody = {
  jokes: Joke[];
};

type GetJokeResponseBody = {
  joke: Joke;
};

type CreateJokeResponseBody = {
  createdJoke: Joke;
};

type CreateJokeRequestBody = Omit<Joke, "id">;

type UpdateJokeResponseBody = {
  createdTask: Joke;
};

type UpdateJokeRequestBody = Partial<Omit<Joke, "id">>;


export const getAllJokes: RequestHandler<{}, GetAllJokesResponseBody> = async (
  req,
  res
) => {

  const {min_fun = 0, max_fun = 10, limit} = req.query;
  
  console.log(min_fun + " - " + max_fun);

  const findArgs = {
    where:{
      funniness: Between(min_fun, max_fun),
      
    },
    take: Number(limit)
  }

  const jokeRepository: Repository<Joke> = getRepository(Joke);
  const jokes: GetAllJokesResponseBody = { jokes: await jokeRepository.find(findArgs) };
  res.send(jokes);
};


export const getJoke: RequestHandler<{ id: string }, Partial<Omit<Joke, "id">>> = async (
  req,
  res
) => {

  const jokeId: string = req.params.id;

  const jokeRepository: Repository<Joke> = getRepository(Joke);

  
  try {
    const joke: Joke =  await jokeRepository.findOneOrFail(jokeId);
    
    console.log(joke);
    res.send(joke);

  } catch (e) {
    res.status(404).send(undefined);
  }



};
export const updateJoke: RequestHandler<
  { id: string },
  UpdateJokeResponseBody,
  UpdateJokeRequestBody
> = async (req, res) => {
  const jokeId: string = req.params.id;
  let {titel, text, visible, funniness} = req.body;

  const jokeRepository:Repository<Joke> =  getRepository(Joke);


  try{
    let joke: UpdateJokeRequestBody = await jokeRepository.findOneOrFail(jokeId);
    joke.titel = titel;
    joke.text = text;
    joke.visible = visible;
    joke.funniness = funniness;

    const jokeResponse: UpdateJokeResponseBody = {createdTask: await jokeRepository.save(joke)};

    console.log("joke to update: " + JSON.stringify(joke));

    res.send(jokeResponse);
  }catch(e){
    res.status(404).send(undefined);
  }


};

export const createJoke: RequestHandler<
  {},
  CreateJokeResponseBody,
  CreateJokeRequestBody
> =  (req, res) => {

  jokeSchema.validate(req.body).then( async () => {
    let joke: CreateJokeRequestBody = req.body;
    console.log(req.body);

    const jokeRepository:Repository<Joke> =  getRepository(Joke);
    const createdJoke: CreateJokeResponseBody = {createdJoke: await jokeRepository.save(joke)};

    res.send(createdJoke);

  }).catch((e) => {
    console.log(e);
    res.status(400).send(undefined);
  });

};


export const deleteJoke: RequestHandler<{ id: string }, {}> = async (req, res) => { 

  const jokeId: string = req.params.id;
  const jokeRepository:Repository<Joke> =  getRepository(Joke);

  try{
    const joke: Joke = await jokeRepository.findOneOrFail(jokeId);
    await jokeRepository.remove(joke);

    res.send({status: "ok"});
  }catch(e){
    res.status(404).send({status: "not_found"});
  }



};


