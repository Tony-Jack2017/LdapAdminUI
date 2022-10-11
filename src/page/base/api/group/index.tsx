import React, { useEffect, useState } from 'react'

// vendor
import { Button, Form, Input, Select, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { getApiGroupList } from '../../../../api/base/api'
import { EditFilled, PlusOutlined } from '@ant-design/icons'

// vendor variable
const { Option } = Select

// type
interface DataType {
    key: number
    id: number
    status: number
    name: string
    prefix: string
    description: string
    created_at: string
}
interface GroupActionProp {
    handleAdd: () => void
    handleSearch: (params: any) => void
}
interface TableActionProp {
    handleClick: () => void
}

// component
const Action = (props: GroupActionProp): React.ReactElement => {
  return (
        <>
            <div className="search-form">
                <Form
                    layout="inline"
                    onFinish={(values) => {
                      props.handleSearch(values)
                    }}
                >
                    <Form.Item label="分组状态：" name="status">
                        <Select
                            placeholder="通过接口分组状态查询"
                            allowClear
                            style={{ width: '100%' }}
                        >
                            <Option value={1}>启用</Option>
                            <Option value={2}>禁用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="分组名：" name="name">
                        <Input placeholder="通过接口分组名查询" />
                    </Form.Item>
                    <Form.Item label="接口分组前缀：" name="prefix">
                        <Input placeholder="通过接口分组前缀查询" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="add-action">
                <Button
                    type="primary" style={{ background: '#00c348', borderColor: '#00c348' }}
                    icon={<PlusOutlined />}
                    onClick={props.handleAdd}
                >
                    新增
                </Button>
            </div>
        </>
  )
}
const TableAction = (props: TableActionProp):React.ReactElement => {
  return (
        <Button type="primary" shape="round" icon={<EditFilled />} onClick={props.handleClick}>
            修改
        </Button>
  )
}
const ApiGroup = () => {
  const [groupList, setGroupList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getData()
  }, [])

  // data
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
      // render: prefix => <span style={{ color: '#5468ff' }}>{prefix}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
              <>
                  {
                      status === 1
                        ? <Tag color="#87d068">启用</Tag>
                        : <Tag color="#f50">禁用</Tag>
                  }
              </>
      )
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
    },
    {
      title: '操作',
      key: 'action',
      render: (_, data) => (
              <TableAction
                  handleClick={() => {

                  }}
              />
      )
    }
  ]

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
                <Action
                    handleAdd={() => {
                    }}
                    handleSearch={getData}
                />
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
