import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';

// Schemas
import User from './src/schemas/User'
import Role from './src/schemas/Role'
import Content from './src/schemas/Content'
import Tag from './src/schemas/Tag'
import { permissionsList } from './src/schemas/fields'

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: `id name email role { ${permissionsList.join(' ')} }`,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    skipKeystoneWelcome: true,
    itemData: {
      role: {
        create: {
          name: 'super-admin',
          canManageRoles: true,
          canViewRoles: true,
          canApproveContent: true,
          canManageContent: true,
          canSuggestContent: true,
          canManageUsers: true,
          canViewUsers: true,
          canManageTags: true
        }
      }
    }
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [
          'http://localhost:3001',
          'http://localhost:3000',
          'http://localhost:4000',
        ],
        credentials: true
      },
      port: 4000
    },
    db: {
      adapter: 'prisma_postgresql',
      url: process.env.DATABASE_URL || 'postgres://postgres:example@localhost:8080/postgres',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: createSchema({
      User,
      Role,
      Content,
      Tag
    }),
    session,
  })
);
