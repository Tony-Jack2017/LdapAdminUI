import React from 'react'
import './index.scss'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout

export interface LayoutOneProps {
  header: React.ReactNode
  sider: React.ReactNode
  content: React.ReactNode
}

const LayoutOne = (props: LayoutOneProps): React.ReactElement => {
  return (
        <div className="layout_one">
            <Layout className="layout">
                <Header>
                    {props.header}
                </Header>
                <Layout>
                    <Sider className="sider">
                        {props.sider}
                    </Sider>
                    <Content className="content">
                        {props.content}
                    </Content>
                </Layout>
            </Layout>
        </div>
  )
}

export default LayoutOne
