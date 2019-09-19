export const formatDate = date => {
  const longDate = new Date(date);

  return longDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const randomMessage = () => {
  const errorMessages = [
    'In a dark place we find ourselves, and a little more knowledge lights our way.',
    'Patience you must have, my young padawan.',
    'When you look at the dark side, careful you must be. For the dark side looks back.',
    'The dark side clouds everything. Impossible to see the future is.',
    'Lost a planet Master Obi-Wan has. How embarrassing...',
  ];

  return errorMessages[Math.floor(Math.random() * errorMessages.length)];
};
