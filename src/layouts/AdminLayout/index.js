import React from 'react';
import {
    LaptopOutlined,
    NotificationOutlined,
    DashboardOutlined,
    DeliveredProcedureOutlined,
    OrderedListOutlined,
    PicCenterOutlined,
    UserOutlined,
    WindowsOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { RiBillLine } from 'react-icons/ri';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './adminLayout.scss';

const { Header, Content, Sider } = Layout;
const items = [
    {
        key: '1',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        route: '/admin/dashboard',
    },
    {
        key: '2',
        icon: <OrderedListOutlined />,
        label: 'Quản lý sản phẩm',
        route: '/admin/products',
    },
    {
        key: '3',
        icon: <DeliveredProcedureOutlined />,
        label: 'Đơn vị phân phối',
        route: '/supplier',
    },
    {
        key: '6',
        icon: <PicCenterOutlined />,
        label: 'Thương hiệu',
        route: '/brands',
    },
    {
        key: '8',
        icon: <WindowsOutlined />,
        label: 'Danh mục sản phẩm',
        route: '/categories',
    },
    {
        key: '4',
        icon: <RiBillLine />,
        label: 'Quản lý đơn hàng',
        route: '/orders',
    },
    {
        key: '5',
        icon: <UserOutlined />,
        label: 'Quản lý tài khoản',
        route: '/users',
    },
    {
        key: '7',
        icon: <SettingOutlined />,
        label: 'Cấu hình trang',
        route: '/setting',
    },
];
const AdminLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        // dispatch(logout());
        navigate('/login');
    };
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <h2 style={{ color: 'white' }}>Molla Shop</h2>
            </Header>
            <Layout>
                <Sider width={210}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ minHeight: 900 }}
                    >
                        {items.map((item) => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <NavLink to={item.route}>{item.label}</NavLink>
                            </Menu.Item>
                        ))}
                        <Menu.Item key={111} icon={<LogoutOutlined />}>
                            <div onClick={handleLogout}> Đăng xuất</div>
                            {/* <Link to="/login">Dang xuat</Link> */}
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
