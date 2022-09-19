import React from 'react'

import Menu from '../page/base/menu'
import Api from '../page/base/api'
import Role from '../page/user/role'

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
        element: <Api />
      }
    ]
  },
  {
    path: '/user',
    layout: 'one',
    children: [
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
