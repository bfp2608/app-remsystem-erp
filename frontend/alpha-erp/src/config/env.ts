interface EnvConfig {
  API_URL: string;
  APP_NAME: string;
}

export const ENV: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
};