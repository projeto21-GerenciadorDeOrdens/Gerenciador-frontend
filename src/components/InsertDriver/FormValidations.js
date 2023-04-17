const validations = {
  motorista: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  placa: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite uma placa válida',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
