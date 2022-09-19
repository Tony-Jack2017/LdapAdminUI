import React, { Fragment } from 'react'
import { Outlet, Route } from 'react-router-dom'
import { RoutePersonal } from '../../../router'
import LayoutOne from '../../../layout/LayoutOne'
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
      return <Fragment/>
  }
}

const RenderRoute = (props: RenderRouteProps): React.ReactElement => {
  return (
        <Fragment>
            {
                props.routes.map(item => {
                  return (
                    (item.layout != null)
                      ? <Fragment key={item.path} >
                          (item.index)
                          ? <Route index element={item.element} />
                          : null
                           <Route path={item.path} element={judgeLayout(item.layout)}>
                                      {
                                          item.children != null
                                            ? RenderRoute({
                                              routes: item.children
                                            })
                                            : null
                                      }
                           </Route>
                        </Fragment>
                      : <Fragment key={item.path}>
                          (item.index)
                          ? <Route index element={item.element} />
                          : null
                          (item.path)
                          ? <Route path={item.path} element={item.element}>
                                      {
                                          item.children != null
                                            ? RenderRoute({
                                              routes: item.children
                                            })
                                            : null
                                      }
                            </Route>
                          : null
                        </Fragment>
                  )
                })
            }
        </Fragment>
  )
}

export default RenderRoute
