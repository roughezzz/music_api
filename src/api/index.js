import express from 'express';
import { songRouter } from './resources/song/song.router';

export const restRouter = express.Router();
restRouter.use('/songs', songRouter);