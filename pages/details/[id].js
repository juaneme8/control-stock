import React from 'react';

import { useRouter } from 'next/router';

import DeviceDetails from '../../components/DeviceDetails';

function Details() {
  const router = useRouter();

  return (
    <div>
      <DeviceDetails barcode={router.query.id} />
    </div>
  );
}

export default Details;
