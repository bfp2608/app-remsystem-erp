package remsystem.admin.form.models.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class Response {
    private String message;
    private int status;
    private boolean success;
}