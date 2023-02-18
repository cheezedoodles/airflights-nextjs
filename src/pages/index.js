import Head from 'next/head'
import { Inter } from '@next/font/google'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

import SearchForm from 'components/SearchForm'
import Flights from 'components/Flights'
import Header from 'components/Header'

import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  
  const [searchTerm, setSearchTerm] = useState('')

  const [flightsData, setFlightsData] = useState([])

  const { data, error } = useSWR(API_ENDPOINT, fetcher)

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event, ref) => {
    if (ref && searchTerm) {
      setFlightsData(
        flightsData.filter(
          (flight) => flight.flight_no.toLowerCase() === ref.current.toLowerCase()
        )
      )
    }
    setSearchTerm('')
    ref.current = ''
    event.preventDefault()
  }
  const handleRefillFlights = () => setFlightsData(data)

  useEffect(() => {
    setFlightsData(data)
  }, [data])

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
      </main>
    </>
  )
}
