import { Request, Response } from 'express';
import LocatorService from '../services/LocatorService';

export default class LocatorController {
  public async get(request: Request, response: Response): Promise<Response> {
    const locatorService = new LocatorService();
    await locatorService.testConn();
    return response.status(200).json({ msg: 'Hello Locator' });
  }
}
