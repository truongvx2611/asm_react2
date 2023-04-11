import { Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { CategoryType } from '../../types/category';

type CategoryManegerProps = {
  categories: CategoryType[];
  onRemove: (_id:string) =>void
}

const CategoryManeger = (props: CategoryManegerProps) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to={`/admin/categories/${record._id}/edit`}>Sửa</Link>
          <button onClick={()=> props.onRemove(record._id)}>Xóa</button>
          <Link to={`/admin/categories/${record._id}/view`}>Xem</Link>
        </Space>
      ),
    },
  ];
  
  const data = props.categories.map((item: CategoryType, index) => {
    return {
      key: index + 1,
      name: item.name,
      _id: item._id
    }
  });
  
  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={{ defaultPageSize: 4, showSizeChanger: true, pageSizeOptions: ['4', '6', '10']}}/>
    </div>
  )
}

export default CategoryManeger