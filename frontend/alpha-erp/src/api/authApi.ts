import { API_URL } from "./routes";
import { fakeLoginApi, fakeMeApi } from "./fakeBackend";
import { ENV } from "../config/env";

export type loginResponse = {
  token: string;
  message: string;
  success: boolean;
  status: number;
}

export type loginRequest = {
  email: string;
  password: string;
}

export type meResponse = {
  nombres:string,
  email:string,
  tipoUsuario:string,
  fechaRegistro:string
}

export const signIn = async (request: loginRequest): Promise<loginResponse> => {
  
  //Casa
  if (ENV.USE_FAKE_BACKEND) {
    const fake = await fakeLoginApi( request);
    return{
      token: fake.token,
      message: "Login exitoso",
      success: true,
      status: 200
    }
  }
  
  //INSTITUTO
  const response = await fetch(`${API_URL.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: loginResponse = await response.json();

  return data;
};

export const router = async (token: string): Promise<meResponse> => {

  if (ENV.USE_FAKE_BACKEND) {
    const fake = await fakeMeApi();
    return fake
  }

  const response = await fetch(`${API_URL.AUTH.ME_LOGIN}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: meResponse = await response.json();
  return data;
}