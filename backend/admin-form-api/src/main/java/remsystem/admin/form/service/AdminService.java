package remsystem.admin.form.service;

import remsystem.admin.form.models.dto.Response;

public abstract class AdminService <T>{
    public static final String PASSWORD_REGEX =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._-])[A-Za-z\\d@$!%*?&._-]{8,16}$";

    public abstract Response methodService(T object);

    protected boolean notValid(String data){
        return data == null || data.isEmpty();
    }

    protected boolean validPassword(String password){
        return !password.matches(PASSWORD_REGEX) || password.length() < 8 || password.length() > 16;
    }
}