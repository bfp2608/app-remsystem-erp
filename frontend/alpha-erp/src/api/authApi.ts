import { fakeLoginApi, LoginRequest } from "./fakeBackend"

export const loginRequest = async (data: LoginRequest) => {
    return await fakeLoginApi(data)
}