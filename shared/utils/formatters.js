export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

export const formatNumber = (number) => {
  if (number === null || number === undefined) return '';
  return new Intl.NumberFormat('fr-FR').format(number);
};