import { useRef, useState, useEffect } from 'react'
import useSWR from 'swr'

export default function SearchForm(
  { searchTerm, 
    handleInputChange, 
    handleSearchSubmit,
  }) 
{

  const searchInputRef = useRef('')

  const onInputChange = (event) => {
    handleInputChange(event)
    searchInputRef.current = event.target.value
  }

  const onSearchSubmit = (event) => handleSearchSubmit(event, searchInputRef)

  return (
    <form onSubmit={onSearchSubmit}>
      <strong>Search: </strong>
      <input 
        ref={searchInputRef} 
        onChange={onInputChange} 
        value={searchTerm}></input>
      &nbsp;
      <button type="submit">Submit</button>
    </form>
  )

}