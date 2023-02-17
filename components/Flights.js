import useSWR from 'swr'
import axios from 'axios'
import styles from '@/styles/Flights.module.css'
import Date from './Date'

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
      <li className={styles.item}>
        <span style={{width: '20%'}}>flight_no</span>
        <span style={{width: '25%'}}>departure_airport</span>
        <span style={{width: '25%'}}>arrival_airport</span>
        <span style={{width: '20%'}}>status</span>
        <span style={{width: '10%'}}>aircraft_code</span>
        <span style={{width: '35%'}}>actual_departure</span>
        <span style={{width: '35%'}}>actual_arrival</span>
      </li>
      {data.map((item) => (
        <li className={styles.item} key={item.flight_id}>
          <span style={{width: '20%'}}>{item.flight_no}</span>
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
      ))}
    </ul>
  )
}