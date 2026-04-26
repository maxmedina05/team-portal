const API_BASE = import.meta.env.VITE_API_BASE

interface TeamStats {
  members: number
  activeProjects: number
  completedThisMonth: number
  efficiency: number
}

interface Activity {
  id: number
  action: string
  timestamp: string
}

export const fetchTeamStats = async (team: string): Promise<TeamStats> => {
  const response = await fetch(`${API_BASE}/teams/${team}/stats`)
  
  return handleResponse<TeamStats>(response)
}

export const fetchFeedActivity = async (): Promise<Activity[]> => {
  const response = await fetch(`${API_BASE}/activities/feed`)
  
  return handleResponse<Activity[]>(response)
}

export const fetchUserActivity = async (): Promise<Activity[]> => {
  const response = await fetch(`${API_BASE}/users/1/activities`)
  
  return handleResponse<Activity[]>(response)
}

// private
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null)

  if(!response.ok) {
    const errorMessage = data?.error ?? response.statusText
    throw new Error(`${errorMessage}`)
  }

  return data as T
}
