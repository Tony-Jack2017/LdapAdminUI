import React from 'react'

import Menu from '../page/base/menu'
import Role from '../page/user/role'
import ApiBase from '../page/base/api/base'
import ApiGroup from '../page/base/api/group'
import UserList from '../page/user/list'

export interface RoutePersonal {
  path: string
  index?: boolean
  layout?: string
  element?: React.ReactNode
  children?: RoutePersonal[]
}

const routes: RoutePersonal[] = [
  {
    path: '/'
  },
  {
    path: '/system',
    layout: 'one',
    children: [
      {
        index: true,
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'api',
        children: [
          {
            path: 'base',
            element: <ApiBase />
          },
          {
            path: 'group',
            element: <ApiGroup />
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    layout: 'one',
    children: [
      {
        path: 'list',
        element: <UserList />
      },
      {
        path: 'role',
        element: <Role />
      }
    ]
  }
]

export {
  routes
}
