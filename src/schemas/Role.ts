import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";

import { permissionFields } from "./fields";
import { permissions, rules } from "../access";

const Role = list({
  ui: {
    createView: {
      defaultFieldMode: rules.canViewManageRoles
    },
    listView: {
      defaultFieldMode: rules.canViewRolesList
    },
    itemView: {
      defaultFieldMode: rules.canViewManageRoles
    }
  },
  access: {
    create: permissions.canManageRoles,
    read: permissions.canViewRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles
  },
  fields: {
    name: text({
      isRequired: true,
      isUnique: true
    }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role',
      many: true
    })
  }
})

export default Role
