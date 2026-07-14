import axios from 'axios'
import * as MOCK from '../data/mockData'

// All requests go to /api (proxied to http://localhost:5000 in dev).
// If the backend is offline, every helper silently falls back to mock data,
// so the public website always works.
export const api = axios.create({ baseURL: '/api', timeout: 6000 })

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

const tryApi = async (fn, fallback) => {
  try { const { data } = await fn(); return data } catch { return fallback }
}

export const getNotices = () => tryApi(() => api.get('/notices'), MOCK.NOTICES)
export const getNews = () => tryApi(() => api.get('/news'), MOCK.NEWS)
export const getEvents = () => tryApi(() => api.get('/events'), MOCK.EVENTS)
export const getGallery = () => tryApi(() => api.get('/gallery'), MOCK.GALLERY)
export const getDownloads = () => tryApi(() => api.get('/downloads'), MOCK.DOWNLOADS)

export const sendContact = (payload) =>
  tryApi(() => api.post('/contact', payload), { ok: true, offline: true })

// ── Auth ──────────────────────────────────────────────
export async function login(username, password) {
  const { data } = await api.post('/auth/login', { username, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data.user
}
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
export function currentUser() {
  try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
}

// ── Portal data ───────────────────────────────────────
export const getMyResults = () => api.get('/marks/me').then(r => r.data)
export const getMyAttendance = () => api.get('/attendance/me').then(r => r.data)
export const getStudents = (params) => api.get('/students', { params }).then(r => r.data)
export const saveMark = (payload) => api.post('/marks', payload).then(r => r.data)
export const saveAttendance = (payload) => api.post('/attendance', payload).then(r => r.data)
export const publishNotice = (payload) => api.post('/notices', payload).then(r => r.data)
export const getChildOverview = () => api.get('/parents/child').then(r => r.data)
export const getAdminStats = () => api.get('/admin/stats').then(r => r.data)

// ── Site content management (Admin CMS) ─────────────
export const getSettings = () => tryApi(() => api.get('/settings'), {})
export const saveSettings = (payload) => api.put('/settings', payload).then(r => r.data)

export const getTeachers = () => tryApi(() => api.get('/teachers'), MOCK.TEACHERS)

export const createItem = (resource, payload) => api.post(`/${resource}`, payload).then(r => r.data)
export const updateItem = (resource, id, payload) => api.put(`/${resource}/${id}`, payload).then(r => r.data)
export const deleteItem = (resource, id) => api.delete(`/${resource}/${id}`).then(r => r.data)
export const listItems = (resource) => api.get(`/${resource}`).then(r => r.data)

export async function uploadFile(file) {
  const fd = new FormData()
  fd.append('file', file)
  const { data } = await api.post('/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data // { url, size }
}

// ── Account management ───────────────────────────────
export const getUsers = () => api.get('/users').then(r => r.data)
export const createUser = (payload) => api.post('/users', payload).then(r => r.data)
export const resetUserPassword = (id, password) => api.put(`/users/${id}/password`, { password }).then(r => r.data)
export const deleteUser = (id) => api.delete(`/users/${id}`).then(r => r.data)

export async function updateMyProfile(payload) {
  const { data } = await api.put('/auth/profile', payload)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data.user
}

// Resolve relative /uploads paths against the API host in production
export const fileUrl = (u) => (u && u.startsWith('/uploads') ? (api.defaults.baseURL.replace(/\/api$/, '') + u) : u)
