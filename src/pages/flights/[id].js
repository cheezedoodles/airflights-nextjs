import { getFlightsIds } from '../../lib/getFlightsIds'

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