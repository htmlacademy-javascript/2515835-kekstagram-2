export const formModule = {
  rules: {
    getRequiredValidator: (message) => (value) => (!value ? message : null),
    getMinLengthValidator: (min, message) => (value) => (value.length < min ? message : null),
    getMaxLengthValidator: (max, message) => (value) => (value.length > max ? message : null),
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
