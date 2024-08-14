import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
}