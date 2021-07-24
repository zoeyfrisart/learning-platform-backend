import { Permission, permissionsList } from './schemas/fields'
import { ListAccessArgs } from './types'

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session
}

interface PermissionFunc {
  ({ session }: ListAccessArgs): boolean
}

type GeneratedPermission = {
  [key in Permission]: PermissionFunc
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const generatedPermissions: GeneratedPermission = Object.fromEntries(permissionsList.map((permission) => [
  permission,
  function generatePermission({ session }: ListAccessArgs) {
    return !!session?.data.role?.[permission]
  },
])) as GeneratedPermission

// Permissions check if someone meets a criteria - yes or no.
export const permissions: GeneratedPermission = {
  ...generatedPermissions
}

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canViewUsers({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return false
    }

    // Can the user view other users
    if (permissions.canViewUsers({ session })) {
      return true
    }

    // Where clause, checks if the user is trying to view themselves
    return { id: session?.itemId }
  },
  canApproveContent({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'read'
    }

    if (permissions.canApproveContent({ session })) {
      return  'edit'
    }

    return 'read'
  },
  canViewManageUsers({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'hidden'
    }

    if (permissions.canManageUsers({ session })) {
      return  'edit'
    }

    return 'hidden'
  },
  canViewManageRoles({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'hidden'
    }

    if (permissions.canManageRoles({ session })) {
      return  'edit'
    }

    return 'hidden'
  },
  canViewManageTags({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'hidden'
    }

    if (permissions.canManageTags({ session })) {
      return  'edit'
    }

    return 'hidden'
  },
  canViewUserList({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'hidden'
    }

    if (permissions.canManageUsers({ session })) {
      return  'read'
    }

    return 'hidden'
  },
  canViewRolesList({ session }: ListAccessArgs) {
    // Is the user signed in
    if (!isSignedIn({ session })) {
      return 'hidden'
    }

    if (permissions.canManageRoles({ session })) {
      return  'read'
    }

    return 'hidden'
  }
}
