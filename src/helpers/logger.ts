import { NextFunction, Request, Response } from 'express'

const expressLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.log(`${req.baseUrl} was visited`)
  next()
}

export default expressLogger
