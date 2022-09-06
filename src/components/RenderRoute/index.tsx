import React, { Fragment } from 'react'
import { Outlet, Route } from 'react-router-dom'
import { RoutePersonal } from '../../router/index'
import LayoutOne from '../../layout/LayoutOne'
import Header from '../Header'
import Navbar from '../Navbar'

export interface RenderRouteProps {
  routes: RoutePersonal[]
}

function judgeLayout (layout: string): React.ReactElement {
  switch (layout) {
    case 'one':
      return <LayoutOne header={<Header/>} sider={<Navbar/>} content={<Outlet/>}/>
    default:
      return <LayoutOne header={<Header/>} sider={<Navbar/>} content={<Outlet/>}/>
  }
}

const RenderRoute = (props: RenderRouteProps): React.ReactElement => {
  return (
      <Fragment>
          {
              props.routes.map(item => {
                return (
                  (item.layout != null)
                    ? <Route key={item.path} path={item.path} element={judgeLayout(item.layout)}>
                        {
                          item.children != null
                            ? RenderRoute({
                              routes: item.children
                            })
                            : null
                        }
                      </Route>
                    : <Route key={item.path} path={item.path} element={item.element}>
                        {
                          item.children != null
                            ? RenderRoute({
                              routes: item.children
                            })
                            : null
                        }
                      </Route>
                )
              })
          }
      </Fragment>
  )
}

export default RenderRoute
