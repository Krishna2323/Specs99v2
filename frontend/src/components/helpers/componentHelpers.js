export const emailValidator = (value) => {
  return value.length > 3 && value.includes("@") && value.includes(".");
};

export const passwordValidator = (value) => {
  return value.trim().length >= 6;
};

export const NameValidator = (value) => {
  return value.trim().length >= 3;
};

export const confirmPasswordValidator = (pass, passConfirm) => {
  return pass === passConfirm;
};

export const availabelColors = [
  "Red",
  "Green",
  "Golden",
  "Silver",
  "Blue",
  "Brown",
  "Silver",
  "Transparent",
  "Orange",
  "Pink",
  "Grey",
  "Multicolor",
];

export const genderOptions = ["Mens", "Womens", "Kids", "Unisex"];
export const sizeOptions = ["Small", "Medium", "Large"];
export const specsTypeOptions = [
  "Sunglasses",
  "Eyeglasses",
  "Eyelenses",
  "Computer Glasses",
];
