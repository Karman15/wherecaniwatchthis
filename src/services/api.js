// API service for all backend calls
// Use relative `/api` paths in production, localhost:5000 in development
const getApiBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api'
  }
  return '/api'
}

const API_BASE_URL = getApiBaseUrl()

export const searchTitles = async (query) => {
  if (!query.trim()) {
    throw new Error('Please enter a title')
  }

  const response = await fetch(`${API_BASE_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query.trim() }),
  })

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.message || 'Search failed')
  }

  if (data.data.length === 0) {
    throw new Error('No results found')
  }

  return data.data
}

export const fetchCountriesForTitle = async (titleId, titleType) => {
  const response = await fetch(`${API_BASE_URL}/countries/${titleId}/${titleType}`)

  const data = await response.json()

  if (!data.success) {
    throw new Error('Could not fetch availability data')
  }

  if (data.data.length === 0) {
    throw new Error('No Netflix availability found for this title')
  }

  return data.data
}
