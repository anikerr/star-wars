export const formatDate = date => {
  const longDate = new Date(date);
  return longDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
