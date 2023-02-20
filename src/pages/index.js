import Head from 'next/head'
import { Inter } from '@next/font/google'

import { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'

import SearchForm from 'components/SearchForm'
import Flights from 'components/Flights'
import Header from 'components/Header'

import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [isDisabled, setIsDisabled] = useState(false)

  const [page, setPage] = useState(1)

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + `?page=${page}`

  const [searchTerm, setSearchTerm] = useState('')

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, isLoading, error } = useSWR(API_ENDPOINT, fetcher)

  const [flightsData, setFlightsData] = useState({flights: [], page: 1, pageCount: 0, lastPage: false})



  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event, ref) => {
    if (ref && searchTerm) {
      setFlightsData({
        ...flightsData,
        flights: flightsData.flights.filter(
          (flight) => flight.flight_no.toLowerCase() === ref.current.toLowerCase()
        ),
        })
    }
    setSearchTerm('')
    ref.current = ''
    setIsDisabled(true)
    event.preventDefault()
  }
  const handleRefillFlights = () => {
    setFlightsData(data)
    setIsDisabled(false)
  }

  useEffect(() => {
    if (data && !isLoading)
      setFlightsData({...data, flights: flightsData.flights.concat(data.flights)})
  }, [data])

  if (isLoading || !flightsData) return <div>Loading data...</div>
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SearchForm 
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          handleSearchSubmit={handleSearchSubmit}
          handleRefillFlights={handleRefillFlights}
        />
        <Flights 
          flightsData={flightsData} 
          error={error}
        />
        <button hidden={isDisabled} onClick={() => setPage(page + 1)}>Load more</button>
      </main>
    </>
  )
}
