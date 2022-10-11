import React, { useEffect, useState } from 'react'

// vendor
import { ColumnsType } from 'antd/es/table'
import { Button, Form, Input, Modal, Select, Switch, Table, Tag, TreeSelect } from 'antd'
import { EditFilled, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'

// custom
import {
  getMenuList,
  modifyMenu,
  addMenu
} from '../../../api/base/menu'
import './index.scss'

// vendor variable
const { Option } = Select

// type
interface DataType {
    key: number
    id: number
    name: string
    path: string
    description: string
    status: number
    parent_id: number
    created_at: string
    updated_at: string
    children?: DataType[]
    deleted_at?: string
}

interface DialogProp {
    type: string
    title: string
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    data?: DataType
    treeData: DataType
    handleConfirm: () => void
    handleTreeData: () => void
}

interface TableActionProp {
    handleClick: () => void
}

interface ActionProp {
    handleAdd: () => void
    handleSearch: (params: any) => void
}

// component
const Action = (props: ActionProp) => {
  return (
        <>
            <div className="search-form">
                <Form
                    layout="inline"
                    onFinish={(values) => {
                      props.handleSearch(values)
                    }}
                >
                    <Form.Item label="菜单状态：" name="status">
                        <Select
                            placeholder="通过菜单状态查询"
                            allowClear
                            style={{ width: '100%' }}
                        >
                            <Option value={1}>启用</Option>
                            <Option value={2}>禁用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="菜单名：" name="name">
                        <Input placeholder="通过菜单名查询" />
                    </Form.Item>
                    <Form.Item label="菜单路径：" name="path">
                        <Input placeholder="通过菜单路径查询" />
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
const Dialog = (props: DialogProp):React.ReactElement => {
  const [form] = useForm<DataType>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [suffix, setSuffix] = useState('')
  useEffect(() => {
    if (!props.data) {
      form.resetFields()
    } else {
      form.setFieldsValue({ ...props.data })
    }
  }, [props.data])

  const handleOk = () => {
    form.validateFields().then(() => {
      setConfirmLoading(true)
      switch (props.type) {
        case 'edit':
        {
          const data = props.data as DataType
          modifyMenu({ ...form.getFieldsValue(), id: data.id, old_path: data.path, type: 1 }).then(resp => {
            setConfirmLoading(false)
            props.setShow(false)
            props.handleConfirm()
            props.handleTreeData()
          }).catch(err => {
            console.log(err)
          })
          break
        }
        case 'add':
        {
          addMenu({ ...form.getFieldsValue() }).then(resp => {
            setConfirmLoading(false)
            props.setShow(false)
            props.handleConfirm()
            props.handleTreeData()
          }).catch(err => {
            console.log(err)
          })
          break
        }
        default:
          break
      }
    }).catch(() => {
      console.log('表单验证失败')
    })
  }
  const handleCancel = () => {
    props.setShow(false)
    form.resetFields()
  }
  const handleSelect = (value: any, node: any, extra: any) => {
    setSuffix(node.path)
  }

  return (
        <Modal
            width="40%"
            okText="确认"
            cancelText="取消"
            forceRender
            title={props.title}
            open={props.show}
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                labelAlign="right"
            >
                <Form.Item label="菜单名" name="name" rules={[{ required: true, message: '菜单名不能为空' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="上级菜单" name="parent_id" rules={[{ required: true, message: '上级菜单不能为空' }]}>
                    {
                        // @ts-ignore
                        <TreeSelect disabled={props.type === 'edit'} treeData={[props.treeData as DataType]} fieldNames={{ label: 'name', value: 'id', children: 'children' }} onSelect={handleSelect}/>
                    }
                </Form.Item>
                <Form.Item label="路由路径" name="path" rules={[{ required: true, message: '路由路径不能为空' }]}>
                    <Input addonBefore={suffix} />
                </Form.Item>
                <Form.Item label="菜单说明" name="description">
                    <TextArea />
                </Form.Item>
                 <Form.Item label="菜单状态" name="status"
                            initialValue={2}
                            getValueProps={value => ({ checked: value === 1, value })}
                            getValueFromEvent= {checked => {
                              console.log(checked)
                              return checked ? 1 : 2
                            }}
                 >
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                 </Form.Item>
            </Form>
        </Modal>
  )
}

const Menu = (): React.ReactElement => {
  const [menus, setMenus] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [data, setData] = useState<DataType>()
  const [treeData, setTreeData] = useState<DataType>({
    id: 0,
    key: 0,
    name: '主菜单',
    path: '',
    description: '',
    status: 1,
    parent_id: 0,
    created_at: '',
    updated_at: '',
    children: []
  })
  useEffect(() => {
    getTreeData()
    getData()
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
                      ? <Tag color="#87d068">启用</Tag>
                      : <Tag color="#f50">禁用</Tag>
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
                      setType('edit')
                      setDialogTitle('修改路由')
                      setShowModal(true)
                      setData(data)
                    }
                } />
      )
    }
  ]

  // handler
  const getData = (params?: any) => {
    setLoading(true)
    getMenuList({ active: 1, type: 1, ...params }).then(resp => {
      setLoading(false)
      handleData(resp.data)
    })
  }
  const getTreeData = () => {
    getMenuList({ active: 1, type: 2 }).then(resp => {
      setTreeData(data => {
        if (resp.data.list.length !== 0) {
          data.children = resp.data.list
        }
        return data
      })
    })
  }
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
                <Action
                    handleAdd={() => {
                      setType('add')
                      setDialogTitle('添加路由')
                      setShowModal(true)
                      setData(undefined)
                    }}
                    handleSearch={getData}
                />
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
                <Dialog title={dialogTitle} show={showModal}
                        type={type} setShow={setShowModal}
                        data={data} handleConfirm={getData}
                        treeData={treeData} handleTreeData={getTreeData} />
            </div>
        </div>
  )
}
export default Menu
