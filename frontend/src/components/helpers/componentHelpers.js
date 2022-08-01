export const emailValidator = (value) => {
  return value.length > 3 && value.includes("@") && value.includes(".");
};

export const passwordValidator = (value) => {
  return value.trim().length >= 6;
};

export const NameValidator = (value) => {
  return value.trim().length >= 3;
};
