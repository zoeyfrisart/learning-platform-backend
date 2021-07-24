import { relationship, text } from "@keystone-next/fields"
import { list } from "@keystone-next/keystone/schema"
import { permissions, rules } from "../access"

const Tag = list({
  ui: {
    createView: {
      defaultFieldMode: rules.canViewManageTags
    },
    itemView: {
      defaultFieldMode: rules.canViewManageTags
    }
  },
  access: {
    create: permissions.canManageTags,
    read: true,
    update: permissions.canManageTags,
    delete: permissions.canManageTags
  },
  fields: {
    name: text({
      isRequired: true,
      isUnique: true
    }),
    color: text({
      isRequired: true,
      defaultValue: '#000'
    }),
    posts: relationship({
      ref: 'Content.tags',
      many: true
    })
  }
})

export default Tag
