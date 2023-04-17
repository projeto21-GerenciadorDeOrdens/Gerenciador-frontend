const validations = {
  remetente: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  cidaderemetente: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome de cidade válido',
    },
  },

  ufremetente: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Selecione um estado',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
