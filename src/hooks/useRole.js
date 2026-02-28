import { useAuthContext } from '../context/AuthContext'
import { ROLE_PERMISSIONS } from '../utils/rolePermissions'

export default function useRole() {
  const { user } = useAuthContext()
  const role = user?.role || null
  const permissions = ROLE_PERMISSIONS[role] || []
  const can = (action) => permissions.includes(action)
  return { role, permissions, can }
}
