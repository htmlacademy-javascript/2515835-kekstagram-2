export const formModule = {
  rules: {
    required: (message) => (value) => (!value ? message : null),
    minLength: (min, message) => (value) => (value.length < min ? message : null),
    maxLength: (max, message) => (value) => (value.length > max ? message : null),
  },
  validationRules: {},

  addValidationRule: function (field, rule) {
    this.validationRules[field] = rule;
  },

  validate: function (data) {
    const errors = {};
    for (const field in this.validationRules) {
      const error = this.validationRules[field](data[field]);
      if (error) {
        errors[field] = error;
      }
    }
    return errors;
  },
};
