import { list } from '@keystone-next/keystone/schema'
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-next/fields'
import { permissions, rules } from '../access'

const User = list({
  ui: {
    createView: {
      defaultFieldMode: rules.canViewManageUsers
    },
    listView: {
      defaultFieldMode: rules.canViewUserList
    },
    itemView: {
      defaultFieldMode: rules.canViewManageUsers
    }
  },
  access: {
    create: permissions.canManageUsers,
    read: rules.canViewUsers,
    update: permissions.canManageUsers,
    delete: permissions.canManageUsers
  },
  fields: {
    name: text({
      isRequired: true
    }),
    email: text({
      isRequired: true,
      isUnique: true
    }),
    password: password({
      minLength: 13,
      rejectCommon: true,
      isRequired: true
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      many: false,
      access: {
        create: permissions.canManageRoles,
        update: permissions.canManageRoles
      }
    }),
    posts: relationship({
      ref: 'Content.author',
      many: true
    })
  }
})

export default User
