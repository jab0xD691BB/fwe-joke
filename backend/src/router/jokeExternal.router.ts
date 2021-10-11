import {Router} from "express";
import { getJokeFromExternalApi } from "../controller/joke.externalAPI";

export const externalJokeRouter = Router({mergeParams: true});


externalJokeRouter.get("/", getJokeFromExternalApi);
