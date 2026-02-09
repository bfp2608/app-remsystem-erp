package remsystem.admin.form.models.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordDto{
    private String email;
    private String newPassword;
    private String confirmNewPassword;
}