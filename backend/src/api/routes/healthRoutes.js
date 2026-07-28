import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", (_, res) => {
  return res.status(200).send("OK");
});

export default healthRouter;
