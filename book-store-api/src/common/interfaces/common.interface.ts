export interface EnvConfigInterface {
  host: string;
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}
