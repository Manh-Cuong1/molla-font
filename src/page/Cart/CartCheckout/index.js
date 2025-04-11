import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import { Radio, Space, message } from 'antd';
import Button from '~/components/Button';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeShippingPrice, changeSubtotal } from '../cartSlice';
import { cartProductsSelector } from '~/redux/selector';
import formatter from '~/config/format';
import Sumary from '~/components/Sumary';
import config from '~/config';
import { GetAuthSelector } from '../../../redux/selectors';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartCheckout(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = GetAuthSelector();
    const { isLogin } = auth;
    const allProductsCart = useSelector(cartProductsSelector);
    const shippingPrice = useSelector((state) => state.cart.shippingPrice);
    const subTotal = useSelector((state) => state.cart.subTotal);
    const handleChangeRadioValue = (e) => {
        dispatch(changeShippingPrice(e.target.value));
    };

    useEffect(() => {
        const result = allProductsCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        dispatch(changeSubtotal(result));
    }, [allProductsCart]);

    const handeSubmit = () => {
        if (isLogin) {
            navigate(`${config.router.checkout}`);
            // message.success('Bạn đã đặt đơn hàng thành công!');
        } else {
            message.error('Bạn cần đăng nhập để thực hiện!');
        }
    };
    return (
        <Sumary className={cx('checkout')} title="Đơn hàng của bạn">
            <div className={cx('subtotal')}>
                <h4>Tiền đơn hàng</h4>
                <span className={cx('subtotal-price')}> {formatter.format(subTotal)}</span>
            </div>

            <div className={cx('shipping')}>
                <h4>Giao hàng</h4>
                <Radio.Group value={shippingPrice} onChange={handleChangeRadioValue}>
                    <Space direction="vertical" defaultValue={1}>
                        <Radio value={0}>
                            <div className={cx('shipping__item')}>
                                <span>Miễn phí ship</span>{' '}
                                <span className={cx('shipping__price')}>Từ 1 - 3 ngày</span>
                            </div>
                        </Radio>
                        <Radio value={50000}>
                            <div className={cx('shipping__item')}>
                                <span>Giao hàng nhanh</span>{' '}
                                <span className={cx('shipping__price')}>50.000 đ</span>
                            </div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className={cx('total')}>
                <span>Tổng:</span>
                <span> {formatter.format(subTotal + shippingPrice)}</span>
            </div>

            <Button
                // to={config.router.checkout}
                style={{ width: '100%' }}
                type="submit"
                outline
                primary
                rightIcon={<ArrowRightOutlined />}
                onClick={handeSubmit}
            >
                Thanh toán
            </Button>
        </Sumary>
    );
}

CartCheckout.propTypes = {};

export default CartCheckout;
