import Menu from '../pages/base/menu'
import React from 'react'

export interface RoutePersonal {
  path: string
  redirect?: string
  layout?: string
  element?: React.ReactNode
  children?: RoutePersonal[]
}

const routes: RoutePersonal[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/system',
    redirect: '/system/menu',
    layout: 'one',
    children: [
      {
        path: '/system/menu',
        element: <Menu />
      },
      {
        path: '/system/api',
        element: <Menu />
      }
    ]
  }
]

export {
  routes
}
