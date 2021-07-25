import { relationship, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permissions, rules } from "../access";

const Content = list({
  access: {
    create: permissions.canSuggestContent,
    read: true,
    update: permissions.canManageContent,
    delete: permissions.canManageContent
  },
  fields: {
    title: text({
      isRequired: true
    }),
    description: text({
      isRequired: true
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true
    }),
    link: text({
      isRequired: true
    }),
    status: select({
      dataType: 'enum',
      options: [
        { label: 'Suggested', value: 'suggestion' },
        { label: 'Declined', value: 'declined' },
        { label: 'Approved', value: 'approved' }
      ],
      defaultValue: 'suggestion',
      isRequired: true,
      access: {
        create: permissions.canApproveContent,
        read: true,
        update: permissions.canApproveContent
      },
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
        itemView: {
          fieldMode: rules.canApproveContent
        }
      }
    }),
    author: relationship({
      ref: 'User.posts'
    })
  }
})

export default Content
