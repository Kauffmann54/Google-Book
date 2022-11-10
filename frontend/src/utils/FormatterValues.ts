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

export const formatNumber = (value: string): number => {
  if (value === undefined || value === "") {
      return 0;
  }
  try {
      if (value.indexOf(",") === -1) {
          return parseFloat(value);
      } else {
          const number = Number.parseFloat(value.replaceAll('.', 'P').replaceAll(',', '.').replaceAll('P', ''));
          return number;
      }
  } catch (error) {
      return 0;
  }
};

export function formatterMoney(value: number, currency: string):string {
  const valueFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
  }).format(value);

  return valueFormatted;
};

export const removeHTMLTags = (value: string) => {
  const regex = /(<([^>]+)>)/ig;
  return value.replace(regex, '');
}

export const formatterDate = (date: string) => {
  const dateSplit = date.split('-');
  if (dateSplit.length > 1) {
    return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`
  }
  return date;
}