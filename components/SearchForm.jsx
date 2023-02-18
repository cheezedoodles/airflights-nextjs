import { useRef, useState, useEffect } from 'react'
import useSWR from 'swr'

export default function SearchForm({ updateFlights, flightsData, fetchedData}) {
  const [searchTerm, setSearchTerm] = useState('')

  const searchInputRef = useRef('')
  
  const onInputChange = (event) => {
    setSearchTerm(event.target.value)
    searchInputRef.current = event.target.value
  }

  const onSearchSubmit = (event) => {
    if (searchInputRef.current && searchTerm) {
      updateFlights(flightsData.filter((flight) => 
        flight.flight_no.toLowerCase() === searchInputRef.current.toLowerCase() 
      ))
    }
    setSearchTerm('')
    searchInputRef.current = ''
    event.preventDefault()
  }

  return (
    <form onSubmit={onSearchSubmit}>
      <strong>Search: </strong>
      <input ref={searchInputRef} onChange={onInputChange} value={searchTerm}></input>
      &nbsp;
      <button type="submit">Submit</button>
      &nbsp;
      <button 
        onClick={() => updateFlights(fetchedData)} 
        type="button">&lt;--</button>
    </form>
  )

}