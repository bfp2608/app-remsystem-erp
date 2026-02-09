package remsystem.admin.form.models.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private String message;
    private int status;
    private boolean success;
}