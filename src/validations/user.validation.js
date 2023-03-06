const yup = require("yup");

exports.userValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  phone: yup.string().required(),
  city: yup.string().nullable(true),
});
