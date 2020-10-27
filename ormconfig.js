module.exports = {
  name: 'mongo',
  type: 'mongodb',
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
  useUnifiedTopology: true,
  entities: (
    process.env.PROD ? ['dist/schemas/*.js'] : ['src/schemas/*.ts']
  ),
};
