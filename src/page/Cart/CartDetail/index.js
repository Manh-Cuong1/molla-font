import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import QuantityProduct from '~/components/QuantityProduct';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, removeFromCart } from '../cartSlice';
import { Grid, message, Popconfirm } from 'antd';
import formatter from '~/config/format';
import CartDetailMobile from './CartDetailMobile';
const { useBreakpoint } = Grid;

const cx = classNames.bind(styles);

function CartDetail(props) {
    const screens = useBreakpoint();

    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cart.products);

    const handleChangeQuantity = (quantity, id) => {
        dispatch(changeQuantity({ quantity: quantity, _id: id }));
    };

    const handleConfirm = (id) => {
        dispatch(removeFromCart(id));
    };
    return (
        <div className={cx('detail')}>
            {!screens.xs ? (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ textAlign: 'center' }}>Giá tiền</th>
                            <th style={{ textAlign: 'center' }}>Số lượng</th>
                            <th style={{ textAlign: 'center' }}>Tổng tiền</th>
                            <th style={{ textAlign: 'center' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList &&
                            cartList.length &&
                            cartList.map((product) => {
                                return (
                                    <tr key={product.number}>
                                        <td style={{ width: '40%' }}>
                                            <div className={cx('detail__info')}>
                                                <div className={cx('detail__thumb')}>
                                                    <img src={product?.image} alt="product name" />
                                                </div>
                                                <h4 className={cx('detail__title')}>
                                                    {product?.name}
                                                </h4>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={cx('detail__price')}>
                                                {formatter.format(product?.price)}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <QuantityProduct
                                                className={cx('detail__quantity')}
                                                defaultValue={product?.quantity}
                                                size="medium"
                                                onChange={(value) =>
                                                    handleChangeQuantity(value, product._id)
                                                }
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={cx('detail__total')}>
                                                {formatter.format(product.price * product.quantity)}
                                            </span>
                                        </td>
                                        <td>
                                            <Popconfirm
                                                className={cx('detail__delete')}
                                                placement="right"
                                                title="Do you want to remove this product from cart ?"
                                                onConfirm={() => handleConfirm(product._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <CloseOutlined />
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <CartDetailMobile
                    cartList={cartList}
                    handleChangeQuantity={handleChangeQuantity}
                    handleConfirm={handleConfirm}
                />
            )}
        </div>
    );
}

CartDetail.propTypes = {};

export default CartDetail;
