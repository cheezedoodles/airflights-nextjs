import { getFlightsIds, getFlightInfo } from '../../../lib/flights'
import Date from 'components/Date'

export default function FlightInfo({ flightInfo }) {
  return (
    <div>
      <table>
        <tr>
          <th>Flight No.</th>
          <th>Departure airport</th>
          <th>Departure airport name</th>
          <th>Departure city</th>
          <th>Arrival airport</th>
          <th>Arrival airport name</th>
          <th>Arrival city</th>
          <th>Status</th>
          <th>Scheduled departure</th>
          <th>Scheduled arrival</th>
        </tr>
        <tr>
          <td>{flightInfo.flightInfo.flight_no}</td>
          <td>{flightInfo.flightInfo.departure_airport}</td>
          <td>{flightInfo.flightInfo.departure_airport_name}</td>
          <td>{flightInfo.flightInfo.departure_city}</td>
          <td>{flightInfo.flightInfo.arrival_airport}</td>
          <td>{flightInfo.flightInfo.arrival_airport_name}</td>
          <td>{flightInfo.flightInfo.arrival_city}</td>
          <td>{flightInfo.flightInfo.status}</td>
          <td>
            <Date 
              dateString={flightInfo.flightInfo.scheduled_departure}
            />
          </td>
          <td>
            <Date 
              dateString={flightInfo.flightInfo.scheduled_arrival}
            />
          </td>
        </tr>
      </table>
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
