import { formatCurrency } from '../../../../helpers';

export const columns = [
    {
        title: 'STT',
        dataIndex: 'number',
        key: 'number',
        width: '2%',
        align: 'center',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name', // Đặt key là "name" thay vì "Tên sản phẩm"
        width: '15%',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        width: '10%',
        key: 'price',
        align: 'center',
        render: (price) => <span>{formatCurrency(`${price}`) + ' đ'}</span>,
    },
    {
        title: 'Khuyến mãi',
        dataIndex: 'promotion',
        key: 'promotion',
        width: '7%',
        align: 'center',
    },
    {
        title: 'Giá nhập hàng',
        dataIndex: 'importPrice',
        key: 'importPrice',
        width: '10%',
        align: 'center',
        render: (importPrice) => <span>{formatCurrency(`${importPrice}`) + ' đ'}</span>,
    },
    {
        title: 'Hàng tồn',
        dataIndex: 'Stock', // Đặt dataIndex là "Stock" thay vì "stock"
        key: 'stock', // Đặt key là "stock" thay vì "Stock"
        width: '10%',
        align: 'center',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
    },
    {
        title: 'Nhà phân phối',
        dataIndex: 'supplier',
        key: 'supplier',
        align: 'center',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand',
        key: 'brand',
        align: 'center',
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (createdAt) => {
            const date = new Date(createdAt); // Đổi biến importPrice thành createdAt
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            return <span>{formattedDate}</span>;
        },
    },
];
