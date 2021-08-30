import React from 'react';

import { useRouter } from 'next/router';

import DeviceDetails from '../../components/DeviceDetails';

function Details() {
  const router = useRouter();

  // console.log(router.query)

  return (
    <div>
      <DeviceDetails barcode={router.query.id} state={router.query.state} />
    </div>
  );
}

export default Details;
