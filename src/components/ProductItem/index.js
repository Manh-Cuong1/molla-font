import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '../Button';
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { message, Rate } from 'antd';
import Evaluate from '../Evaluate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/page/Cart/cartSlice';
import { formatCurrency } from '../../helpers';

const cx = classNames.bind(styles);

function ProductItem({
    id,
    name,
    price,
    category,
    image,
    oldPrice,
    rate,
    countRate,
    isLoading,
    description,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickItem = () => {
        navigate(`/product-detail/${id}`);
        window.scrollTo(0, 0);
    };
    const handleAddProduct = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        // message.success({
        //     content: `Add \"${product.title}\" successfuly !`,
        //     className: 'custom-class',
        //     style: {
        //         textTransform: 'capitalize',
        //     },
        // });
        // message.config({
        //     top: 100,
        //     duration: 1,
        //     maxCount: 1,
        // });
    };
    return (
        <div className={cx('wrapper', { loading: isLoading })}>
            <div className={cx('main')}>
                <div className={cx('thumb')}>
                    <img className={cx('img')} src={image} alt={name} onClick={handleClickItem} />
                    <Button
                        leftIcon={<ShoppingCartOutlined />}
                        className={cx('add')}
                        onClick={() =>
                            handleAddProduct({
                                id,
                                name,
                                price,
                                category,
                                image,
                                oldPrice,
                                rate,
                                description,
                                countRate,
                            })
                        }
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
                <div className={cx('info')} onClick={handleClickItem}>
                    <span className={cx('category')}>{category}</span>
                    <span className={cx('title')}>{name}</span>
                    <div className={cx('price')}>
                        <span className={cx('price-current')}>
                            {formatCurrency(`${price}`) + 'đ'}
                        </span>
                        {oldPrice > price && (
                            <span className={cx('price-old')}>
                                {' '}
                                {formatCurrency(`${oldPrice}`) + 'đ'}
                            </span>
                        )}
                    </div>
                </div>

                <div className={cx('evaluate')}>
                    {' '}
                    <Evaluate rate={rate} countRate={countRate} isDisabled />
                </div>
            </div>

            {/* <div className={cx('tags')}></div> */}

            <div className={cx('btn-group')}>
                <Link to={config.router.products} className={cx('wishlist')}>
                    <label>Thêm vào yêu thích</label>
                    <span>
                        <HeartOutlined />
                    </span>
                </Link>
                <Link to={config.router.products} className={cx('quick-view')}>
                    <EyeOutlined />
                </Link>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    oldPrice: PropTypes.number,
    rate: PropTypes.number,
    countRate: PropTypes.number,
    description: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default ProductItem;
