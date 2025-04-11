import { CalendarOutlined, CreditCardOutlined, KeyOutlined } from '@ant-design/icons';
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { Form, Button, message } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import { BASE_API_URL } from '../../../constants/api';
import axios from 'axios';
import { CreateOrder } from '../../../modules/order';
const Payment = () => {
    const dataCart = JSON.parse(localStorage.getItem('checkoutData'));
    const createOrder = CreateOrder();
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = {
        amount: dataCart.totalPrice,
    };
    const onFinish = (values) => {
        // Xử lý dữ liệu khi nhấn nút "Thanh toán"
        console.log('Received values:', values);
    };
    console.log(dataCart);
    const payBtn = useRef(null);
    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                `${BASE_API_URL}api/v1/payment/process`,
                paymentData,
                config,
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: dataCart.shippingInfo.name,
                        email: dataCart.shippingInfo.email,
                        address: {
                            line1: dataCart.shippingInfo.address,
                            city: 'Hanoi',
                            state: 'Hanoi',
                            postal_code: 10000,
                            country: 'VN',
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                message.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    dataCart.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    createOrder(dataCart);
                    // dispatch(createOrder(order));

                    // message.success('Đơn hàng của bạn đã được đặt thành công');
                    console.log(result);
                    // history.push('/whitelist');
                } else {
                    message.error('Có một số vấn đề trong khi xử lý thanh toán!');
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            message.error(error.response);
        }
    };
    return (
        <div style={{ margin: '0px 400px' }}>
            {' '}
            <div className="paymentContainer">
                <h3 style={{ textAlign: 'center', alignItems: 'center' }}>
                    Sử dụng thẻ visa, martercard để thực hiện thanh toán
                </h3>
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <CreditCardOutlined className="icon-payment" />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <CalendarOutlined className="icon-payment" />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <KeyOutlined className="icon-payment" />
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <input
                        type="submit"
                        value={`Thanh toán `}
                        className="paymentFormBtn"
                        ref={payBtn}
                    />
                </form>
            </div>
        </div>
    );
};

export default Payment;
