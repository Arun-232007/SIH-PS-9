const API_URL = 'http://localhost:8000'

export async function analyzeBusiness(data) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze business')
  }

  return response.json()
}