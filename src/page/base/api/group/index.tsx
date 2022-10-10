import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { getApiGroupList } from '../../../../api/base/api'

interface DataType {
    key: number
    id: number
    status: number
    name: string
    prefix: string
    description: string
    created_at: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '分组名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '前缀',
    dataIndex: 'prefix',
    key: 'prefix'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '详情',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at'
  }
]

const ApiGroup = () => {
  const [groupList, setGroupList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getData()
  }, [])
  // handler
  const getData = (params?: any) => {
    setLoading(true)
    getApiGroupList({ active: 1, ...params })
      .then(resp => {
        handleData(resp.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  const handleData = (data: any) => {
    const list = data.list.map((item: any) => {
      return {
        key: item.id,
        ...item
      }
    })
    setGroupList(list)
    setTotal(data.total)
  }
  const handlePaginationChange = (page: number, pageSize: number) => {
    getData({ page, size: pageSize })
    console.log(page, pageSize)
  }

  // view
  return (
        <div className="api-group-page">
            <div className="data-action">
                This is Action
            </div>
            <div className="data-show">
                <Table columns={columns} dataSource={groupList}
                       loading={loading}
                       pagination={
                            {
                              total,
                              onChange: handlePaginationChange
                            }
                        }
                />
            </div>
            <div className="dialog"></div>
        </div>
  )
}

export default ApiGroup
