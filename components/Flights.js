import useSWR from 'swr'
import axios from 'axios'
import styles from '@/styles/Flights.module.css'

export default function Flights() {
  const API_ENDPOINT = `http://127.0.0.1:3001/api/flights`

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(API_ENDPOINT, fetcher)
  
  if (error) {
    return <div>{error.message} {error.stack}</div>
  }
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.map((item) => (
        <li className={styles.item} key={item.flight_id}>
          <span style={{width: '10%'}}>{item.flight_id}</span>
          <span style={{width: '10%'}}>{item.flight_no}</span>
          <span style={{width: '10%'}}>{item.departure_airport}</span>
          <span style={{width: '10%'}}>{item.arrival_airport}</span>
          <span style={{width: '10%'}}>{item.status}</span>
          <span style={{width: '10%'}}>{item.aircraft_code}</span>
          <span style={{width: '20%'}}>{item.actual_departure || 'NOT DEPARTED YET'}</span>
          <span style={{width: '20%'}}>{item.actual_arrival || 'NOT ARRIVED YET'}</span>
        </li>
      ))}
    </ul>
  )
}