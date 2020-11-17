export {};
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Request {
      user: {
        code: string;
      };
    }
  }
}
