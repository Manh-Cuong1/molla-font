import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '~/components/Container';
import ProductsCarousel from '~/components/ProductsCarousel';
// import { allCategriesSelector, allProductsSelector } from '~/redux/selector';
import { get } from '~/utils/axiosRequest';
import styles from './TrendyProducts.module.scss';
import { allProducts } from './data';
import { FilterHomeProducts } from '../../../../modules/products';
const cx = classNames.bind(styles);

function TrendyProducts() {
    const slider = useRef();
    const [currentCat, setCurrentCat] = useState('all');
    const [keyword, setKeyword] = useState();
    const data = FilterHomeProducts(currentCat, keyword);
    // const allProducts = [useSelector(allProductsSelector);]
    // const allCategries = useSelector(allCategriesSelector);
    const [isLoading, setIsLoading] = useState(true);

    const handleChangeCat = (category) => {
        setCurrentCat(category);
    };
    useEffect(() => {
        const getProduct = async () => {
            try {
                setIsLoading(true);
                setIsLoading(false);
            } catch (error) {
                alert('Something went wrong !');
            }
        };
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCat]);
    return (
        <Container>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>Sản phẩm đang HOT</h2>
                <ul className={cx('category')}>
                    <li
                        className={`${cx('category__item', {
                            active: currentCat === 'all',
                        })} underline`}
                        onClick={() => setCurrentCat('all')}
                    >
                        <h3>Tất cả</h3>
                    </li>
                    {data?.categories?.length &&
                        data?.categories?.map(
                            (item) =>
                                item.trending && (
                                    <li
                                        key={item._id}
                                        className={cx('category__item', {
                                            active: currentCat === item.name,
                                            // active: currentCat === 'all',
                                        })}
                                        onClick={() => {
                                            handleChangeCat(item.name);
                                        }}
                                    >
                                        <h3>{item.name}</h3>
                                    </li>
                                ),
                        )}
                </ul>
                <div className={cx('product-list')}>
                    {data?.data.length ? (
                        <ProductsCarousel isLoading={isLoading} listProducts={data?.data} />
                    ) : (
                        data?.data &&
                        data?.data.length && (
                            <ProductsCarousel isLoading={isLoading} listProducts={data?.data} />
                        )
                    )}
                </div>
            </div>
        </Container>
    );
}

export default TrendyProducts;
