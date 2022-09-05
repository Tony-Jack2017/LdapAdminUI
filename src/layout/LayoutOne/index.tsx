import React from 'react'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
export interface LayoutOneProps {
  header: React.ReactNode
  sider: React.ReactNode
  content: React.ReactNode
  children: React.ReactNode
}

const LayoutOne = (props: LayoutOneProps): React.ReactElement => {
  return (
        <div className="layout_one">
            <Layout>
                <Header>
                    {props.header}
                </Header>
                <Layout>
                    <Sider>
                        {props.sider}
                    </Sider>
                    <Content>
                        {props.content}
                    </Content>
                </Layout>
            </Layout>
        </div>
  )
}

export default LayoutOne
