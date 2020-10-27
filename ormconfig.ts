export = {
  name: 'mongo',
  type: 'mongodb',
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
  useUnifiedTopology: true,
  entities: ['src/schemas/*.ts'],
};
