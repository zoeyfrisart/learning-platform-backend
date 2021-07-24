import type { Permission } from './schemas/fields'

export type { Permission } from './schemas/fields'

export type Session = {
  itemId: string
  listKey: string
  data: {
    name: string
    role?: {
      id: string
      name: string
    } & {
      [key in Permission]: boolean
    }
  }
}

export type AccessArgs = {
  session?: Session
  item?: unknown
}

export type AccessControl = {
  [key: string]: (args: AccessArgs) => unknown
}

export type ListAccessArgs = {
  itemId?: string
  session?: Session
}
