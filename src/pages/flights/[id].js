import Date from 'components/Date'

import { getFlightsIds, getFlightInfo } from '../../../lib/flights'

import styles from '@/styles/FlightInfo.module.css'

export default function FlightInfo({ flightInfo }) {
  return (
    <>
      <div>
        <table>
          <thead>
           <tr>
              <td>Flight No.</td>
              <td>Departure airport</td>
              <td>Departure airport name</td>
              <td>Departure city</td>
              <td>Arrival airport</td>
              <td>Arrival airport name</td>
              <td>Arrival city</td>
              <td>Status</td>
              <td>Scheduled departure</td>
              <td>Scheduled arrival</td>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
      <div className={styles.seats}>
        {flightInfo.allSeats.map((seat) => 
          <button key={seat.seat_no}>{seat.seat_no}</button>
        )}
      </div>
    </>
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
