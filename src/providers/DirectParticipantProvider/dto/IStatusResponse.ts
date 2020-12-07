import IStatus from './IStatus';

export default interface IStatusResponse {
  statusCode: number;
  data?: IStatus;
  error?: string;
}
