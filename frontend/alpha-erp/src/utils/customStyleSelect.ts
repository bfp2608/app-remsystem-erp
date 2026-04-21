export const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#0f172a',
        borderColor: state.isFocused ? '#14b8a6' : '#334155',
        borderRadius: '0.5rem',
        boxShadow: state.isFocused ? '0 0 0 1px #14b8a6' : 'none',
        minHeight: '46px',
        height: '46px',
        '&:hover': {
            borderColor: '#14b8a6'
        }
    }),

    valueContainer: (provided: any) => ({
        ...provided,
        padding: '0 16px',
        height: '42px',
    }),

    input: (provided: any) => ({
        ...provided,
        color: 'white',
        margin: '0px',
        padding: '0px',
    }),

    indicatorsContainer: (provided: any) => ({
        ...provided,
        height: '42px',
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: 'white',
    }),

    placeholder: (provided: any) => ({
        ...provided,
        color: '#94a3b8',
    }),

    menu: (provided: any) => ({
        ...provided,
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#134e4a'
            : state.isFocused
            ? '#0f766e'
            : 'transparent',
        color: state.isSelected ? '#5eead4' : 'white',
        cursor: 'pointer',
    }),
};