import { Request, Response } from 'express';
import * as yup from 'yup';
import LocatorService from '../services/LocatorService';
import AppError from '../errors/AppError';

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
    const { code } = request.params;
    const schema = yup
      .string()
      .length(6)
      .matches(/[A-Z0-9]{6}/);
    const isValid = await schema.isValid(code);
    if (!isValid) {
      throw new AppError('Localizador não encontrado.', 404);
    }
    const locatorService = new LocatorService();
    const locators = await locatorService.getLocator(code);
    return response.status(200).json({ locators });
  }
}
