export const getAtualYear = () => {
  const dateFormatted = new Date();
  return dateFormatted.getFullYear();
};

export function removeUndefinedProps(obj: any): any {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop];
    }
  }
  return obj;
}
