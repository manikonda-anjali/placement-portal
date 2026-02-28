import api from './api'

export const reportService = {
  getPlacementStats: () => api.get('/reports/placement-stats'),
  getBranchWise: () => api.get('/reports/branch-wise'),
  getCompanyWise: () => api.get('/reports/company-wise'),
  getTrends: () => api.get('/reports/trends'),
  getAllPlacements: (params) => api.get('/reports/placements', { params }),
  verifyPlacement: (id) => api.patch(`/reports/placements/${id}/verify`),
}
