import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
// import { allProductsSelector } from '~/redux/selector';
import ProductDetailTop from './components/ProductDetailTop';
import SuggestProducts from './components/SuggestProducts';
import styles from './ProductDetail.module.scss';
import { FilterHomeProducts } from '../../modules/products';

const cx = classNames.bind(styles);
export default function ProductDetail() {
    const data = FilterHomeProducts('all');
    const { productId } = useParams();
    const currentProduct = data?.data.find((item) => item.number === Number(productId));
    return (
        <Container>
            {currentProduct && (
                <>
                    <ProductDetailTop currentProduct={currentProduct} />
                    <SuggestProducts currentProduct={currentProduct} />
                </>
            )}
        </Container>
    );
}
