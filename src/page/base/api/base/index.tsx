import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { getApiList } from '../../../../api/base/api'

interface DataType {
    key: number
    id: number
    name: string
    method: 'POST' | 'GET'
    path: string
    status: 1
    description: string
    created_at: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '接口名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '接口类型',
    dataIndex: 'method',
    key: 'method'
  },
  {
    title: '请求路径',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '详细描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at'
  }
]

const Action = (): React.ReactElement => {
  return (
        <div>
            This is Action
        </div>
  )
}

const ApiBase = () => {
  const [apisList, setApiList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getData()
  }, [])

  // handler
  const getData = () => {
    setLoading(true)
    getApiList({ active: 1 }).then(resp => {
      handleData(resp.data)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }
  const handleData = (data:any) => {
    const list = data.list.map((item: any) => {
      return {
        key: item.id,
        ...item
      }
    })
    setApiList(list)
    setTotal(total)
  }

  // view
  return (
        <div className="api-base-page">
            <div className="data-action">
                <Action/>
            </div>
            <div className="data-show">
                <Table columns={columns} loading={loading} dataSource={apisList}/>
            </div>
            <div className="dialog">

            </div>
        </div>
  )
}

export default ApiBase
