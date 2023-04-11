import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom"

import { IProduct } from "../types/product";


type ProductProps = {
    products: IProduct[];
}

const Home = (props: ProductProps) => {
    return (
        <div className="container sanphammoi">
            <div className="sanphammoi_tiltle">
                <h2>
                  <a href="#">Tất cả sản phẩm</a>
                </h2>
            </div>
            <div className="row">
                {props.products.map((item, index) => {
                    return (
                    <div className="col-md-3 col-6 pro-loop" key={index+1}>
                        <div className="product">
                            <div className="product_img">
                            <Link to={`/products/${item._id}`}>
                                <div className="figure">
                                <img src={item.image} width={270} height={270}/>
                                <img src="./assets/img/<?php echo $value['anhchitiet'] ?>" className="image-hover" />
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

export default Home