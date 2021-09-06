export const getStateColor = state => {
    if (state === 'approved') return 'green.400';
    if (state === 'fix') return 'yellow.400';
    if (state === 'rejected') return 'red.400';
};

export const getLineColor = (location) => {
    if (location === 'CIME') return 'teal.400';

    if (location === 'Taller Nazca') return 'blue.300';
    if (location === 'Taller Polvorín') return 'blue.300';

    if (location === 'Taller Urquiza') return 'red.400';
    if (location === 'Taller Rancagua') return 'red.400';

    if (location === 'Taller Constitución') return 'blue.500';

    if (location === 'Taller Canning') return 'green.400';
    if (location === 'Taller Congreso de Tucumán') return 'green.400';
    
    if (location === 'San José') return 'purple.400';
    
    if (location === 'Taller Colonia') return 'yellow.500';
    if (location === 'Taller Parque Patricios') return 'yellow.500';


    if (location === 'Taller Rubén Darío') return 'orange.500';
    
    if (location === 'Taller Mariano Acosta') return 'yellow.700';

    else return 'gray.500'
  };