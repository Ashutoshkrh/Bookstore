import { EnvConfigInterface } from 'src/common/interfaces/common.interface';

export default (): EnvConfigInterface => ({
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 3000),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
