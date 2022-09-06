import React from 'react'
import { Menu } from 'antd'
import { FundFilled, FolderOpenFilled } from '@ant-design/icons'
import './index.scss'

const items = [
  {
    label: '系统管理',
    key: 'sub1',
    icon: <FundFilled />,
    children: [
      { label: '菜单管理', key: 'option-1' },
      { label: '接口管理', key: 'option-2' }
    ]
  },
  { label: '用户管理', key: 'item-1', icon: <FolderOpenFilled /> }
]

const Navbar = (): React.ReactElement => {
  return (
        <div className="navbar">
            <Menu mode="inline" items={items} />
        </div>
  )
}

export default Navbar
