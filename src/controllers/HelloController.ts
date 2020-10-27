import { Request, Response } from 'express';
import HelloService from '../services/HelloService';

export default class HelloController {
  public async get(request: Request, response: Response): Promise<Response> {
    const helloService = new HelloService();
    await helloService.testConn();

    return response.status(200).json({ msg: 'Hello World' });
  }
}
