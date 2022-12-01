const getData = async (startDate, endDate) => {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    const data = await res.json()
    return data
}

export default getData
