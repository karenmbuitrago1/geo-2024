export const getTodayFormattedDate = () => {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString('es-CO', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      year: 'numeric',
    })
    .replace(',', '');

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
