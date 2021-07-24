import { checkbox } from '@keystone-next/fields'

/**
 * Generates permission fields for the roles.
 *
 * @author yannick1691<yannick.frisart@outlook.com>
 */
export const permissionFields = {
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can manage roles'
  }),
  canViewRoles: checkbox({
    defaultValue: true,
    label: 'User can read roles'
  }),
  canApproveContent: checkbox({
    defaultValue: false,
    label: 'User can approve content for production'
  }),
  canManageContent: checkbox({
    defaultValue: false,
    label: 'User can manage content'
  }),
  canSuggestContent: checkbox({
    defaultValue: true,
    label: 'User can suggest new content to the site'
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can create new users'
  }),
  canViewUsers: checkbox({
    defaultValue: false,
    label: 'User can see other users'
  }),
  canManageTags: checkbox({
    defaultValue: false,
    label: 'User can create new tags'
  })
}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(permissionFields) as Permission[]
