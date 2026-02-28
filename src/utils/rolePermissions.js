export const ROLE_PERMISSIONS = {
  admin: ['manage_users', 'view_reports', 'manage_jobs', 'view_all_applications', 'system_settings'],
  student: ['view_jobs', 'apply_job', 'view_own_applications', 'edit_profile'],
  employer: ['post_job', 'edit_own_jobs', 'view_applicants', 'update_application_status'],
  officer: ['view_all_placements', 'verify_placement', 'generate_reports', 'view_all_students']
}

export const ROLE_HOME = {
  admin: '/admin',
  student: '/student',
  employer: '/employer',
  officer: '/officer'
}

export const ROLE_COLORS = {
  admin: '#ec4899',
  student: '#00d4ff',
  employer: '#10b981',
  officer: '#f59e0b'
}

export const ROLE_LABELS = {
  admin: 'Administrator',
  student: 'Student',
  employer: 'Employer',
  officer: 'Placement Officer'
}
