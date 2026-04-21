package remsystem.admin.form.models.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class UsuarioTable extends Response{
    private List<UsuarioTableData> allUserTable;
}