import useSWR from 'swr'
import axios from 'axios'

export default function Flights() {
  const API_ENDPOINT = `http://127.0.0.1:3001/api/flights`

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(API_ENDPOINT, fetcher)
  
  if (error) {
    return <div>{error.message} {error.stack}</div>
  }
  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.map((item) => (
        <div key={item.flight_id}>
          {item.flight_id} {item.flight_no} {item.departure_airport} {item.arrival_airport}
        </div>
        
        
      ))}
    </div>
  )
}