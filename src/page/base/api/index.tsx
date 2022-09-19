import React, { useEffect } from 'react'
import { Table } from 'antd'
import { getApiList } from '../../../api/base/api'
import { ColumnsType } from 'antd/es/table'

interface DataType {
    key: number
    id: number
    status: number
    name: string
    path: string
    method: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '接口名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '接口路径',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '接口状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '接口类型',
    dataIndex: 'method',
    key: 'method'
  }
]

const Api = (): React.ReactElement => {
  useEffect(() => {
    getApiList({ active: 1 })
  }, [])
  return (
        <div className="api-page">
            <div className="search"></div>
            <div className="data-show">
                <Table
                    columns={columns}
                />
            </div>
            <div className="dialog">

            </div>
        </div>
  )
}

export default Api
