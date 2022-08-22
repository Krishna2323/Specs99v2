export const camelCaseText = (el) =>
  el
    .split(" ")
    .map((el, i) => {
      if (i === 0) {
        return el;
      } else {
        return el.replace(el[0], el[0].toUpperCase());
      }
    })
    .join("");

export const firstUpperWithNoSpace = (el) =>
  el
    .split(" ")
    .map((el, i) => {
      return el.replace(el[0], el[0].toUpperCase());
    })
    .join("");
