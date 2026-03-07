interface EnvConfig {
  API_URL: string;
  APP_NAME: string;
  USE_FAKE_BACKEND: boolean;
}

export const ENV: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  USE_FAKE_BACKEND: import.meta.env.VITE_USE_FAKE_BACKEND === 'true',
};