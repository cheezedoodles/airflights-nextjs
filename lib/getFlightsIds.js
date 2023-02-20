async function getFlightsIds() {
  const paths = await fetch('http://localhost:3001/api/flights/ids')
    .then((response) => response.json())

  return paths.map((flight) => {
    console.log(flight)
    return {
      params: {
        id: flight.flight_id,
      }
    }
  })
}