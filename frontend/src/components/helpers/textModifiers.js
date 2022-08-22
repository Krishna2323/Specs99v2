export const firstLetterCap = (text) => {
  let allCapWords = text
    .split(" ")
    .map((e) => e.replace(e[0], e[0].toUpperCase()));

  return allCapWords.join(" ");
};
