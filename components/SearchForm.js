import { useRef, useState } from 'react'

export default function SearchForm({ updateFlights, flights_data }) {
  const [searchTerm, setSearchTerm] = useState('')

  const searchInputRef = useRef('')
  
  const onInputChange = (event) => {
    setSearchTerm(event.target.value)
    searchInputRef.current = event.target.value
  }

  const onSearchSubmit = (event) => {
    if (searchInputRef.current) {
      updateFlights(flights_data.filter((flight) => 
        flight.flight_no.toLowerCase() === searchInputRef.current.toLowerCase()
      ))
      setSearchTerm('')
      searchInputRef.current = ''
    }
    event.preventDefault()
  }

  return (
    <form onSubmit={onSearchSubmit}>
      <strong>Search: </strong>
      <input ref={searchInputRef} onChange={onInputChange} value={searchTerm}></input>
      &nbsp;
      <button type="submit">Submit</button>
    </form>
  )

}