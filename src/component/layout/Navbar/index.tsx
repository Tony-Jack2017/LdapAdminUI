import React, { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { getMenuList } from '../../../api/base/menu'

interface MenuItemType {
  id: number,
  name: string,
  path: string,
  description: string,
  status: number,
  children: MenuItemType[]
  created_at: string,
  updated_at: string,
  deleted_at?: string
}

type MenuItem = Required<MenuProps>['items'][number]

const Navbar = (): React.ReactElement => {
  const [items, setItems] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    getMenuList({
      active: 1,
      type: 2
    }).then(resp => {
      handleData(resp.data)
    })
  }, [])
  // handler
  const handleMenus = (data: MenuItemType[]): MenuItem[] => {
    return data.map((item: MenuItemType) => {
      if (item.children) {
        return {
          label: item.name,
          key: item.path,
          disabled: item.status === 2,
          children: handleMenus(item.children)
        }
      } else {
        return {
          label: item.name,
          key: item.path,
          disabled: item.status === 2
        }
      }
    })
  }
  const handleData = (data: any) => {
    const list = handleMenus(data.list)
    setItems(list)
  }
  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  // view
  return (
        <div className="navbar">
            <Menu onClick={handleClick} mode="inline" items={items} />
        </div>
  )
}

export default Navbar
