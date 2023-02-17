import { useState } from 'react'

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('')

  const onInputChange = (e) => setSearchTerm(e.currentTarget.value)

  return (
    <form>
      <strong>Search: </strong>
      <input onChange={onInputChange} value={searchTerm}></input>
      &nbsp;
      <button type="submit">Submit</button>
    </form>
  )

}