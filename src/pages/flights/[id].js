import { getFlightsIds } from '../../lib/flights'

export async function getStaticPaths() {
  const paths = await getFlightsIds()

  return {
    paths,
    fallback: false,
  }
}

export default function FlightInfo() {
  return <>hello world</>
}