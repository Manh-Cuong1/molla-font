import { Col, Pagination, Row, Select, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductItem from '~/components/ProductItem';
import './custom.scss';
import styles from './MainProducts.module.scss';
import { BASE_API_URL, PRODUCTS } from '~/constants/api';

const { Option } = Select;
const cx = classNames.bind(styles);

export default function MainProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [error, setError] = useState(null);

    // ✅ Fetch product data từ backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_API_URL}${PRODUCTS.LIST}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Origin': window.location.origin
                    },
                    mode: 'cors',
                    credentials: 'omit'
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("API không trả về dữ liệu JSON!");
                }

                const data = await res.json();
                console.log('Dữ liệu fetch được:', data); // Debug
                
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    throw new Error('Dữ liệu không đúng định dạng');
                }
                setIsLoading(false);
                setError(null);
            } catch (err) {
                console.error("❌ Lỗi lấy danh sách sản phẩm:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    // ✅ Xử lý phân trang
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    if (error) {
        return <div className={cx('error')}>Error: {error}</div>;
    }

    return (
        <div className="products__main-products">
            <div className={cx('top')}>
                <div className={cx('filter')}>
                    <span className={cx('showing')}>
                        Đang có <span className={cx('number')}>{products.length}</span> sản phẩm
                    </span>
                </div>

                <div className={cx('sortGroup')}>
                    <div className={cx('sort')}>
                        <label>Sắp xếp: </label>
                        <div className={cx('select')}>
                            <Select defaultValue="Mặc định" style={{ width: 120 }}>
                                <Option value="default">Mặc định</Option>
                                <Option value="highest">Đánh giá cao nhất</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={cx('sort')}>
                        <label>Sắp xếp theo giá: </label>
                        <div className={cx('select')}>
                            <Select defaultValue="default" style={{ width: 160 }}>
                                <Option value="default">Mặc định</Option>
                                <Option value="lowest">Giá từ thấp đến cao</Option>
                                <Option value="highest">Giá từ cao xuống thấp</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <ul className={cx('list')}>
                        <Row gutter={[20, 30]}>
                            {currentProducts && currentProducts.length > 0 ? (
                                currentProducts.map((item) => (
                                    <Col key={item.id} xs={24} sm={12} md={8}>
                                        <ProductItem
                                            id={item.id}
                                            category={item.category}
                                            image={item.image}
                                            price={item.price}
                                            name={item.name}
                                            rate={item.rating}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <div className={cx('no-products')}>Không có sản phẩm nào</div>
                            )}
                        </Row>
                    </ul>
                    {products.length > 0 && (
                        <Pagination
                            current={currentPage}
                            defaultPageSize={productsPerPage}
                            total={products.length}
                            onChange={handleChangePage}
                            style={{ textAlign: 'center', marginTop: 20 }}
                        />
                    )}
                </>
            )}
        </div>
    );
}
