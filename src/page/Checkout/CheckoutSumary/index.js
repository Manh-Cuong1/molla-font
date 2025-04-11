import React from 'react';
import Sumary from '~/components/Sumary';

import classNames from 'classnames/bind';
import styles from './CheckoutSumary.module.scss';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { cartProductsSelector } from '~/redux/selector';
import config from '~/config';

const cx = classNames.bind(styles);

export default function CheckoutSumary() {
    const cartProducts = useSelector(cartProductsSelector);
    const shippingPrice = useSelector((state) => state.cart.shippingPrice);
    const subTotal = useSelector((state) => state.cart.subTotal);

    return (
        <Sumary className={cx('wrapper')} title="Đơn hàng của bạn">
            <div className={cx('products')}>
                <div className={cx('products__label')}>
                    <span> Sản phẩm</span>
                    <span> Giá tiền</span>
                </div>
                <ul className={cx('list')}>
                    {cartProducts &&
                        cartProducts.length &&
                        cartProducts.map((product) => (
                            <li className={cx('item')} key={product._id}>
                                <div className={cx('info')}>
                                    <span className={cx('name')}>{product.name}</span>
                                    <span className={cx('quantity')}> x{product.quantity}</span>
                                </div>
                                <span className={cx('price')}>
                                    {config.formatter.format(product.price)}
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
            <div className={cx('title')}>
                <span> Tổng tiền sản phẩm: </span>
                <span> {config.formatter.format(subTotal)} </span>
            </div>
            <div className={cx('title')}>
                <span> Phí giao hàng: </span>
                <span> {config.formatter.format(shippingPrice)} </span>
            </div>
            <div className={cx('title', { total: true })}>
                <span> Tổng tiền đơn hàng: </span>
                <span> {config.formatter.format(subTotal + shippingPrice)} </span>
            </div>
            <Button outline primary full type="submit">
                Đặt hàng
            </Button>
        </Sumary>
    );
}
