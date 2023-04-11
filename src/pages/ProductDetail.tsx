import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readCate } from '../api/category';
import { read } from '../api/products';
import {IProduct} from "../types/product"

const ProductDetail = () => {
  const {id} = useParams();
  const [Product, setProduct] = useState<IProduct>()
  const [productRelated, setProductRelated] = useState<IProduct[]>()
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await read(id as string);
      setProduct(data)      
      const {data: productRelated} = await readCate(data.category as string);
      setProductRelated(productRelated.products)
    };
    getProduct();
  },[id])
  return (
    <div>
      <div className="container single-product mt-5">
        <div className="row">
          <div className="col" style={{width: '90%'}}>
            <img src={Product?.image} width={500} id="large_img" />
            <br /><br />
          </div>
          <div className="col">
            <div className="single-product-title">
              <h2>{Product?.name}</h2>
            </div>
            <div className="single-product-price">
              <h4>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Product?.price as number)}</h4>
            </div>
            <form >
              <div className="d-flex align-items-center" style={{margin: '20px 0'}}>
                <input type="number" defaultValue={1} min={1} max={9} />
                <a className="btn btn-dark">Thêm vào giỏ</a>
              </div>
            </form>
            <div className="single-product-details">
              <h1>Miêu tả</h1>
              <div>{Product?.description}</div>
              <br />
            </div>
          </div>
        </div>
    </div>
    <div className="container sanphammoi">
        <div className="sanphammoi_tiltle">
            <h2>
              <a href="#">Sản phẩm liên quan</a>
            </h2>
        </div>
        <div className="row">
            {productRelated?.filter((item) => item.name !== Product?.name).slice(0, 4).map((item, index) => {
                return (
                <div className="col-md-3 col-6 pro-loop" key={index+1}>
                    <div className="product">
                        <div className="product_img">
                        <Link to={`/products/${item._id}`}>
                            <div className="figure">
                            <img src={item.image} width={270} height={270}/>
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
  </div>

  )
}

export default ProductDetail