import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readCate } from '../api/category'
import { IProduct } from '../types/product'

type Props = {}

const CateDetail = (props: Props) => {
  const [products, setProducts]= useState<IProduct[]>([])
  const [cateName, setCateName] = useState<string>('')
  const {id} = useParams();
//   console.log(id)
  useEffect(()=>{
    const getProductByCate = async () =>  {
      const {data} = await readCate(id as string);
      setProducts(data.products)
      setCateName(data.category.name)
    }
    getProductByCate()
  },[id])
  return (
    <div className="container sanphammoi">
        <div className="sanphammoi_tiltle">
            <h2>
            <a href="#">{cateName}</a>
            </h2>
        </div>
        <div className="row">
            {products.map((item, index) => {
                return (
                <div className="col-md-3 col-6 pro-loop" key={index+1}>
                    <div className="product">
                        <div className="product_img">
                        <Link to={`/products/${item._id}`}>
                            <div className="figure">
                            <img src={item.image} width={270} height={270}/>
                            {/* <img src="./assets/img/<?php echo $value['anhchitiet'] ?>" className="image-hover" /> */}
                            </div>
                        </Link>
                        </div>
                        <div className="product_detail">
                            <h3 className="product_detail-name">
                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                            </h3>
                            <div className="product_detail-price">
                                <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                )
            })}
        </div>
    </div>
  )
}

export default CateDetail