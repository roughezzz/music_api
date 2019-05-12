import express from 'express';
import { songRouter } from './resources/song/song.router';
import { userRouter } from './resources/user/user.router';
import { playlistRouter } from './resources/playlist/playlist.router';

export const restRouter = express.Router();
restRouter.use('/songs', songRouter);
restRouter.use('/users', userRouter);
restRouter.use('/playlist', playlistRouter);