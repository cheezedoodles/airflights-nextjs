import { getFlightsIds, getFlightInfo } from '../../../lib/flights'

export default function FlightInfo({ flightInfo }) {
  return (
    <div>
      {flightInfo.flightInfo.flight_id}
      {flightInfo.flightInfo.flight_no}
      {flightInfo.flightInfo.departure_airport_name}
      {flightInfo.flightInfo.arrival_airport_name}
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getFlightsIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const flightInfo = await getFlightInfo(params.id)
  return {
    props: {
      flightInfo,
    },
  }
}
