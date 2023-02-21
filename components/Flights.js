import Link from 'next/link'
import styles from '@/styles/Flights.module.css'
import Date from './Date'

export default function Flights({ flightsData, handleRefillFlights, error }) {

  if (error) {
    return <div>{error.message} {error.stack}</div>
  }
  if (!flightsData) return <div>Loading...</div>  
  console.log(flightsData)
  return (
      <ul>
        <li className={styles.item}>
          <span style={{width: '20%'}}>flight_no</span>
          <span style={{width: '25%'}}>departure_airport</span>
          <span style={{width: '25%'}}>arrival_airport</span>
          <span style={{width: '20%'}}>status</span>
          <span style={{width: '10%'}}>aircraft_code</span>
          <span style={{width: '35%'}}>actual_departure</span>
          <span style={{width: '35%'}}>actual_arrival</span>
        </li>
        {flightsData.exists
        ? flightsData.flights.map((item) => (
          <li className={styles.item} key={item.flight_id}>
            <span style={{width: '20%'}}>
              <Link href={`/flights/${item.flight_id}`}>{item.flight_no}</Link>
            </span>
            <span style={{width: '25%'}}>{item.departure_airport}</span>
            <span style={{width: '25%'}}>{item.arrival_airport}</span>
            <span style={{width: '20%'}}>{item.status}</span>
            <span style={{width: '10%'}}>{item.aircraft_code}</span>
            <span style={{width: '35%'}}>
              {item.actual_departure 
                ? <Date dateString={item.actual_departure} /> 
                : 'TBA'}
            </span>
            <span style={{width: '35%'}}>
            {item.actual_arrival 
                ? <Date dateString={item.actual_arrival} /> 
                : 'TBA'}
            </span>
          </li>
        ))
        : (<p>Wrong flight number!&nbsp;
            <button 
              onClick={(event) => {
                handleRefillFlights()
                event.preventDefault()
              }}>
              Go back
            </button>
          </p>)
        }
      </ul>
  )
}