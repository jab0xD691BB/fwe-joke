import {Router} from "express";
import { downloadJokes } from "../controller/joke.download";

export const jokeDownloadRouter = Router({mergeParams: true});


jokeDownloadRouter.get("/", downloadJokes);