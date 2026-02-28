import api from './api'

export const jobService = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  apply: (jobId, data) => api.post(`/jobs/${jobId}/apply`, data),
  getApplications: (jobId) => api.get(`/jobs/${jobId}/applications`),
  getMyApplications: () => api.get('/applications/me'),
  updateApplicationStatus: (appId, status) => api.patch(`/applications/${appId}/status`, { status }),
}
