import { Space, Table, Image } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { listCate } from '../../api/category';
import { CategoryType } from '../../types/category';
import { IProduct } from '../../types/product'

type ProductManegerProps = {
  products: IProduct[];
  onRemove: (_id:string) =>void
}

const ProductManeger = (props: ProductManegerProps) => {
  const [category, setCategory] = useState<CategoryType[]>()
  useEffect(() => {
      const getCategory = async() =>{
        const {data: category} = await listCate()
        setCategory(category)
      }
      getCategory()
  },[])
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text : string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text : string) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text : string) => <a>{category && category.map(item => {if(item._id == text){return item.name}} )}</a>,
    },
    {
      title: 'Image',
      key: 'Image',
      render: (text : string, record: any) => (
        <Space size="middle">
          <Image src={record.image} alt="" height={70} />
        </Space>
      ),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (text : string) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text : string, record: any) => (
        <Space size="middle">
          <Link to={`/admin/products/${record._id}/edit`}>Sửa</Link>
          <button onClick={()=> props.onRemove(record._id)}>Xóa</button>
        </Space>
      ),
    },
  ];
  const data = props.products.map((item: IProduct, index) => {
    return {
      key: index + 1,
      name: item.name,
      category: item.category,
      price: item.price,
      description :item.description,
      image: item.image,
      _id: item._id
    }
  });
  
  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10']}} />
    </div>
  )
}

export default ProductManeger