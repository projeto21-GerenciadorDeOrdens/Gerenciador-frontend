const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';

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

  frete: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 5,
      message: 'Digite um frete válido',
    },
  },

  peso: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 5,
      message: 'Digite um peso válido',
    },
  },

  pedagio: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 5,
      message: 'Digite valor válido',
    },
  },

  imposto: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 3,
      message: 'Digite um valor válido',
    },
  },

  adiantamento: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 4,
      message: 'Digite um valor válido',
    },
  },

  abastecimento: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 4,
      message: 'Digite um valor válido',
    },
  },

  cte: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 5,
      message: 'Digite um número de CTE válido',
    },
  },

  valorcte: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) <= 5,
      message: 'Digite um valor válido',
    },
  },

  data: {
    custom: {
      isValid: (value) => !value || !isNaN(new Date(value?.split('-').join('-'))),
      message: 'Selecione uma data',
    },
  },

  usuario: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome de usuario válido',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
