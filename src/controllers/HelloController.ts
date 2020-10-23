import { Request, Response } from 'express';

export default class HelloController {
  public async get(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ msg: 'Hello World' });
  }
}
