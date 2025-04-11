import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import style from './search.module.scss';
import './style.css';
import { FilterHomeProducts } from '../../modules/products';

const cx = className.bind(style);
function SearchField({ className, normal }) {
    const navigate = useNavigate();
    const options = [];
    const data = FilterHomeProducts('all');
    data?.data &&
        data?.data.forEach((item, i) => {
            options.push({
                value: item.number,
                label: item.name,
            });
        });
    const onChange = (value) => {
        navigate(`/product-detail/${value}`);
        window.scrollTo(0, 0);
    };
    return (
        <div className={cx('search', { normal })}>
            <Select
                style={{
                    width: '100%',
                }}
                bordered={false}
                suffixIcon={null}
                showSearch
                placeholder="Tìm theo tên sản phẩm ..."
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={options}
            />
            <span
                // to={config.router.products}
                className={cx('search-icon')}
                // onClick={handleSearch}
            >
                <SearchOutlined />
            </span>
        </div>
    );
}

SearchField.propTypes = {};

export default SearchField;
