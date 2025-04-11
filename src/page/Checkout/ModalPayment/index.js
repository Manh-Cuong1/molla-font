import { Modal, Button, Checkbox, Form, Input, message } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {
    CalendarOutlined,
    CreditCardOutlined,
    KeyOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './style.css';
import { BASE_API_URL } from '../../../constants/api';

const ModalPayment = (props) => {
    console.log(props.payload.totalPrice);

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const handleOk = () => {
        props.setIsModalOpen(false);
    };
    const handleCancel = () => {
        props.setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const paymentData = {
        amount: Math.round(props.payload.totalPrice * 1000),
    };
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
                        name: props.payload.shippingInfo.name,
                        email: props.payload.shippingInfo.email,
                        address: {
                            line1: props.payload.shippingInfo.address,
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
                    const order = {
                        orderItems: props.payload.orderItems,
                        shippingInfo: props.payload.shippingInfo,
                        itemsPrice: props.payload.itemsPrice,
                        taxPrice: props.payload.taxPrice,
                        shippingPrice: props.payload.shippingPrice,
                        totalPrice: props.payload.totalPrice,
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                        },
                    };

                    // dispatch(createOrder(order));

                    message.success('Đơn hàng của bạn đã được đặt thành công');
                    // history.push('/whitelist');
                } else {
                    message.error('Có một số vấn đề trong khi xử lý thanh toán!');
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            message.error(error.response.data.message);
        }
    };
    return (
        <Modal
            title="Visa, Master Card"
            visible={props.isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
        >
            <div className="paymentContainer">
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
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Modal>
    );
};

export default ModalPayment;
