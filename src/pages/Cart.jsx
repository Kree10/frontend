import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeProduct } from '../store/cartSlice';
import { createOrderApi } from '../api/Api';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cart } = useSelector((state) => ({
        cart: state.cartSlice.cart,
    }));

    const [totalAmount, setTotalAmount] = useState(0);
    const [shippingAddress, setShipingAddress] = useState('');

    const dispatch = useDispatch();
    const handleQuantityDecrease = (itemId) => {
        console.log(itemId);
        dispatch(decreaseQuantity({itemId}));
    };

    const handleQuantityIncrease = (itemId) => {
        console.log(itemId);
        dispatch(increaseQuantity({itemId}));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeProduct({itemId}));
    };

    //   -----------------------------
    // calculate total amount

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cart.forEach((item) => {
            const itemTotal = item.productPrice * item.productQuantity;
            totalAmount = totalAmount + itemTotal;
        });
        setTotalAmount(totalAmount);
    };

    useEffect(() => {
        calculateTotalAmount()
    }, [cart]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const orderDetails = {
            cart,
            totalAmount,
            shippingAddress,
        };
        console.log(orderDetails);
        createOrderApi(orderDetails).then((res) => {
            toast.success("Order placed successfully!");
        }).catch((err) => {
            console.log(err);
            toast.error("Order placed failed!");
        });
    };

    return (
        <div className="container">
            <section className="h-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <hr className="my-4" />

                                                {
                                                    cart.map((item) => (
                                                        <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={item.productImage}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt"
                                                                />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 className="text-muted">{item.productName}</h6>
                                                                <h6 className="text-black mb-0">{item.productCategory}</h6>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <button className="btn btn-link px-2" onClick={() => handleQuantityDecrease(item.productId)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>

                                                                <input id="form1" min="0" name="quantity" value={item.productQuantity} type="number"
                                                                    className="form-control form-control-sm"
                                                                />

                                                                <button className="btn btn-link px-2" onClick={() => handleQuantityIncrease(item.productId)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">NPR. {item.productPrice}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <button onClick={() => handleRemoveItem(item.productId)} className="btn"><i className="fas fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                                <hr className="my-4" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <h6 className="text-muted">Total quantity: {cart.length}</h6>
                                                <h6 className="text-muted">Total price:</h6>
                                                <h3 className="fw-bold">NPR. {totalAmount.toFixed(2)}</h3>
                                                <hr />
                                                <p htmlFor="">Shipping Address</p>
                                                <input type="text" className='form-control m-0 p-0' onChange={(e) => setShipingAddress(e.target.value)} />

                                                <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-block mt-3">Place an order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart