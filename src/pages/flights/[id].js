import { getFlightsIds, getFlightInfo } from '../../lib/flights'

export async function getStaticProps({ params }) {
  const flightInfo = getFlightInfo(params.id)
  return {
    props: {
      flightInfo,
    },
  }
}

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