import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../errors/AppError';
import IndexLocatorService from '../services/IndexLocatorService';
import ShowLocatorService from '../services/ShowLocatorService';

export default class LocatorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const locatorService = new IndexLocatorService();
    const locators = await locatorService.execute();
    return response.status(200).json({ locators });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const schema = yup
      .string()
      .length(6)
      .matches(/[A-Z0-9]{6}/);
    const isValid = await schema.isValid(code);
    if (!isValid) {
      throw new AppError('Localizador não encontrado.', 404);
    }
    const locatorService = new ShowLocatorService();
    const locators = await locatorService.execute(code);
    return response.status(200).json({ locators });
  }
}
