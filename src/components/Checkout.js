import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getCartProducts } from './'

const Checkout = (props) => {

    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')

    return(
        <div className="checkout">
            <h1>Order Details</h1>
            <div>
                <div className="checkoutproducts">

                </div>
            </div>
        </div>
    )
}

export default Checkout