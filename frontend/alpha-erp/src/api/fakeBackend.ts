import { ROLE_TYPES } from "../constans"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: {
        email: string
        role: string
    }
}

const fakeUser = {
    email: "admin@empresa.com",
    password: "123456",
    role: ROLE_TYPES.admin
}

export const fakeLoginApi = (data: LoginRequest): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (
                data.email === fakeUser.email &&
                data.password === fakeUser.password
            ) {
                resolve({
                    token: "fake-jwt-token-123456789",
                    user: {
                        email: fakeUser.email,
                        role: fakeUser.role
                    }
                })
            } else {
                reject(new Error("Credenciales incorrectas"))
            }
        }, 1000)
    })
}

export const fakeMeApi = () =>{
    return Promise.resolve ( {
        nombres: "Admin Fake",
        email: fakeUser.email,
        tipoUsuario: fakeUser.role,
        fechaRegistro: "2026-01-01"
    }) 
}