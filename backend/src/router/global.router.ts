import { Router } from "express";
import { jokeRouter } from "./joke.router";
import { jokeDownloadRouter } from "./jokeDownload.router";
import { externalJokeRouter } from "./jokeExternal.router";

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

globalRouter.use("/joke", jokeRouter);
globalRouter.use("/download", jokeDownloadRouter);
globalRouter.use("/jokeExternal", externalJokeRouter);
