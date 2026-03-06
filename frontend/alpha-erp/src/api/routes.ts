import { ENV } from "../config/env";

const BASE_URL = ENV.API_URL;

export const API_URL = {
    AUTH : {
        LOGIN : `${BASE_URL}:8080/auth/sign/in`,
        ME_LOGIN : `${BASE_URL}:8080/auth/me`
    }
}