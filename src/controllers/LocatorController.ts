import { Request, Response } from 'express';
import LocatorService from '../services/LocatorService';

export default class LocatorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const locatorService = new LocatorService();
    const locators = await locatorService.getAllLocators();
    return response.status(200).json({ locators });
  }

  public async getLocator(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const locatorService = new LocatorService();
    const { code } = request.params;
    const locators = await locatorService.getLocator(code);
    return response.status(200).json({ locators });
  }
}
