export async function fetchJSON(path: string, init?: RequestInit) {
  const res = await fetch(path, { next: { revalidate: 0 }, ...init } as any)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const getCats = async () => fetchJSON('/api/cats')
export const getDashboard = async () => fetchJSON('/api/dashboard')
export const getSensors = async () => fetchJSON('/api/sensors')
export const postFeeding = async (body: any) => fetchJSON('/api/feeding', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
export const estimateFood = async (body: any) => fetchJSON('/api/ai', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
