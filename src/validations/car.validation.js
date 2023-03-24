const yup = require("yup");

exports.carValidation = yup.object({
  model: yup.string().required(),
  year: yup.string().required(),
  color: yup.string().required(),
  price: yup.number().required(),
});
