const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787/api'

export async function sendMessage(message: string, sessionId?: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId: sessionId || '' })
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export async function getHistory(sessionId: string) {
  const res = await fetch(`${API_BASE}/history/${sessionId}`)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export async function resetSession(sessionId: string) {
  const res = await fetch(`${API_BASE}/reset/${sessionId}`, { method: 'POST' })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}
