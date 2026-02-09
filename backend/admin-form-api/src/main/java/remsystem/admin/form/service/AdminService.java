package remsystem.admin.form.service;

import remsystem.admin.form.models.dto.Response;

public interface AdminService <T>{
    Response methodService(T object);
}