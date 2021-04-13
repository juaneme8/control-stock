import React from 'react';
import Link from 'next/link';
const NotFound = () => {
  return (
    <div>
      <h1>Ooooops...</h1>
      <h2>Página No Encontrada</h2>
      <p>
        Ir al{' '}
        <Link href="/">
          <a>Inicio</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
