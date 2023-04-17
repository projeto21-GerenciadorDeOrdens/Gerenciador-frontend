const validations = {
  destinatario: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  cidadedestinatario: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome de cidade válido',
    },
  },

  ufdestinatario: {
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
