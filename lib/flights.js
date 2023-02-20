export async function getFlightsIds() {
  const paths = await fetch('http://localhost:3001/api/flights/ids')
    .then((response) => response.json())

  return paths.map((flight) => {
    console.log({
      params: {
        id: flight.flight_id,
      }
    })
    return {
      params: {
        id: flight.flight_id,
      }
    }
  })
}

export async function getFlightInfo(id) {
  const data = await fetch(`http://localhost:3001/api/flights/${id}`)
    .then((response) => response.json())

  return {
    id,
    ...data
  }
}
