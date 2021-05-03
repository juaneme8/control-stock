import DeviceDetails from '../../components/DeviceDetails';

export default function deviceDetails({ device }) {
  return <DeviceDetails device={device} />;
}

export async function getServerSideProps({ query }) {
  const barcode = query.barcode;

  try {
    const res = await fetch(`http://localhost:3000/api/devices/${barcode}`);
    const device = await res.json();

    return {
      props: { device },
    };
  } catch (err) {
    console.error(err);
  }
}
