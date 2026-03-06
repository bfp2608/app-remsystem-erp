import { API_URL } from "./routes";

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