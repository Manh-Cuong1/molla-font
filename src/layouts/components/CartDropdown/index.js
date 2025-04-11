import className from 'classnames/bind';
import style from './CartDropdown.module.scss';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Dropdown, message } from 'antd';
import DropdownItem from './DropdownItem';
import Button from '~/components/Button';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { cartProductsSelector, cartTotalProductsSelector } from '~/redux/selector';
import formatter from '~/config/format';
import images from '~/assets/images';
import { formatCurrency } from '../../../helpers';
import { GetAuthSelector } from '../../../redux/selectors';

const cx = className.bind(style);
function CartDropdown() {
    const cartProducts = useSelector(cartProductsSelector);
    const auth = GetAuthSelector();
    const { isLogin } = auth;
    const navigate = useNavigate();
    const subTotal = useMemo(() => {
        return cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }, [cartProducts]);

    const navigateCheckout = () => {
        if (isLogin) {
            navigate('/checkout');
        } else {
            message.error('Vui lòng đăng nhập để thực hiện thanh toán!');
        }
    };
    return (
        <div className={cx('wrapper')}>
            {cartProducts && cartProducts.length > 0 ? (
                <>
                    <ul className={cx('list')} tabIndex="-1">
                        {cartProducts.map((product) => (
                            <DropdownItem key={product.id} product={product} />
                        ))}
                    </ul>
                    <div className={cx('footer')}>
                        <div className={cx('total')}>
                            <span className={cx('total__label')}>Tổng tiền:</span>
                            <span className={cx('total__price')}>
                                {formatCurrency(`${subTotal}`) + ' đ'}
                            </span>
                        </div>
                        <div className={cx('btn__group')}>
                            <Button to="/cart" primary fill>
                                Chi tiết
                            </Button>
                            <Button
                                // to="/checkout"
                                onClick={navigateCheckout}
                                outline
                                primary
                                rightIcon={<ArrowRightOutlined />}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('empty')}>
                        <img src={images.emptyCart} />
                        <h3>Không có sản phẩm nào trong giỏ hàng của bạn</h3>
                    </div>
                </>
            )}
        </div>
    );
}

CartDropdown.propTypes = {};

export default CartDropdown;
