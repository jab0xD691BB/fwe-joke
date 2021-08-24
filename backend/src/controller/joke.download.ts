import { RequestHandler } from "express";
import ObjectsToCsv from "objects-to-csv";
import { getRepository, Repository } from "typeorm";
import { Joke } from "../entity/joke.model";

type GetAllJokesResponseBody = {
    jokes: Joke[];
  };


export const downloadJokes: RequestHandler<{}, {}> = async (
    req,
    res
  ) => {
  
    const jokeRepository: Repository<Joke> = getRepository(Joke);
    const jokes: GetAllJokesResponseBody = { jokes: await jokeRepository.find() };
    let csv: any;
    
    if(jokes.jokes.length > 0){

    let json = JSON.parse(JSON.stringify(jokes.jokes));
    let fields = Object.keys(json[0]);
    const replacer = (key:any, value:any) => {return value === null ? '' : value};

    csv = json.map((row:any) => {
        return fields.map((fieldName => {
            return JSON.stringify(row[fieldName], replacer)
        })).join(",")
    })
    csv.unshift(fields.join(","));
    csv = csv.join('\r\n');
  }

    res.status(200).type('text/csv').attachment("jokes.csv").send(csv);
  };