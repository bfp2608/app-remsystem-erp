package remsystem.admin.form.models.enums;

public enum TipoUsuarioEnum {
    Administrador("Administrador"),
    Trabajador("Trabajador");

    private final String tipo;

    TipoUsuarioEnum(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public static TipoUsuarioEnum fromString(String value) {
        if (value == null) {
            return null;
        }

        for (TipoUsuarioEnum tipo : TipoUsuarioEnum.values()) {
            if (tipo.tipo.equalsIgnoreCase(value)) {
                return tipo;
            }
        }

        return null;
    }

    public static boolean existsTipo(String tipo) {
        return fromString(tipo) != null;
    }
}