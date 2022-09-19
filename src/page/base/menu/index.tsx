import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Form, Input, Modal, Select, Table, Tag } from 'antd'
import { EditFilled, PlusOutlined } from '@ant-design/icons'
import { getMenuList } from '../../../api/base/menu'
import './index.scss'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'
const { Option } = Select

interface DataType {
    key: number,
    id: number,
    name: string,
    path: string,
    description: string,
    status: number,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

interface DialogProp {
    title: string
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    type: string
    data?: DataType
}

interface ActionProp {
    handleClick: () => void
}

const Action = () => {
  return (
        <>
            <div className="search-form">
                <Form
                    layout="inline"
                >
                    <Form.Item label="菜单状态：">
                        <Select
                            placeholder="通过菜单状态查询"
                            style={{ width: '160px' }}
                        >
                            <Option value={1}>启用</Option>
                            <Option value={2}>禁用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="菜单名：">
                        <Input placeholder="通过菜单名查询" />
                    </Form.Item>
                    <Form.Item label="菜单路径：">
                        <Input placeholder="通过菜单路径查询" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="add-action">
                <Button type="primary" style={{ background: '#00c348', borderColor: '#00c348' }} icon={<PlusOutlined />}>新增</Button>
            </div>
        </>
  )
}

const TableAction = (props: ActionProp):React.ReactElement => {
  return (
        <Button type="primary" shape="round" icon={<EditFilled />} onClick={props.handleClick}>
            修改
        </Button>
  )
}

const Dialog = (props: DialogProp):React.ReactElement => {
  const [form] = useForm<DataType>()
  useEffect(() => {
    form.setFieldsValue({ ...props.data })
  }, [props.data])
  return (
        <Modal
            width="40%"
            title={props.title}
            open={props.show}
            onOk={() => { props.setShow(false) }}
            onCancel={() => { props.setShow(false) }}
            forceRender
        >
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                labelAlign="right"
            >
                <Form.Item
                    label="菜单名"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="路由路径"
                    name="path"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="菜单说明"
                    name="description"
                >
                    <TextArea />
                </Form.Item>
                {/* <Form.Item */}
                {/*    label="菜单状态" */}
                {/*    name="status" */}
                {/* > */}
                {/*    <Switch /> */}
                {/* </Form.Item> */}
            </Form>
        </Modal>
  )
}

const Menu = (): React.ReactElement => {
  const [menus, setMenus] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<DataType>()
  useEffect(() => {
    getMenuList({
      active: 1,
      type: 1
    }).then(resp => {
      setLoading(false)
      handleData(resp.data)
    })
  }, [])

  // data
  const columns: ColumnsType<DataType> = [
    {
      title: '菜单名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '路由路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
            <>
                {
                    status === 1
                      ? <Tag color="#87d068">
                        启用
                    </Tag>
                      : <Tag color="#f50">
                        禁用
                    </Tag>
                }
            </>
      )
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
                <TableAction handleClick={
                    () => {
                      setShowModal(true)
                      setData(data)
                    }
                } />
      )
    }
  ]

  // handler
  const handleData = (data: any) => {
    const list = data.list.map((item: any) => {
      return {
        key: item.id,
        ...item
      }
    })
    setMenus(list)
    setTotal(data.total)
  }
  const handlePaginationChange = (page: number, pageSize: number):void => {
    console.log(page, pageSize)
  }

  // view
  return (
        <div className="menu-page">
            <div className="data-action">
                <Action />
            </div>
            <div className="data-show">
                <Table
                    columns={columns}
                    loading={loading}
                    pagination={
                        {
                          total,
                          onChange: handlePaginationChange
                        }
                    }
                    dataSource={menus}
                 />
            </div>
            <div className="dialog">
                <Dialog title={'修改路由'} show={showModal} type={'edit'} setShow={setShowModal} data={data} />
            </div>
        </div>
  )
}

export default Menu
