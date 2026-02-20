package remsystem.admin.form.clientes.models.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Response{
    private int status;
    private String message;
    private boolean success;
}