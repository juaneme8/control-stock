export const getStateColor = state => {
    if (state === 'approved') return 'green.400';
    if (state === 'fix') return 'yellow.400';
    if (state === 'rejected') return 'red.400';
};

export const getLineColor = (location) => {
    if (location === 'Linea A') return 'blue.100';
    if (location === 'Linea B') return 'red.400';
    if (location === 'Linea C') return 'blue.400';
    if (location === 'Linea D') return 'green.400';
    if (location === 'Linea E') return 'purple.400';
    if (location === 'Linea H') return 'yellow.500';
    if (location === 'Linea P') return 'yellow.800';
    if (location === 'CIME') return 'teal.400';
  };