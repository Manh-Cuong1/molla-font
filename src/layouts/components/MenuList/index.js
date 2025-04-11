import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import config from '~/config';
import { hideSidebar, toggleShowSidebar } from '~/redux/showSlice';
import style from './MenuList.module.scss';
import authServices from '../../../services/authServices';
import { GetAuthSelector } from '../../../redux/selectors';
import { logout } from '../../../redux/auth';
const cx = className.bind(style);

function MenuList({ vertical, className }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = GetAuthSelector();
    const handleClickMenuItem = () => {
        dispatch(hideSidebar());
        window.scrollTo(0, 0);
    };
    const handleLogout = () => {
        dispatch(hideSidebar());
        dispatch(logout());
        window.scrollTo(0, 0);
    };
    const { isLogin, isAdmin } = auth;
    return (
        <ul className={`${cx('menu-list', { vertical })} ${[className]}`}>
            <li className={cx('menu-item')}>
                <NavLink
                    onClick={handleClickMenuItem}
                    className={(nav) => cx('menu-link', { active: nav.isActive })}
                    to={config.router.home}
                >
                    Trang chủ
                </NavLink>
            </li>

            <li className={cx('menu-item')}>
                <NavLink
                    onClick={handleClickMenuItem}
                    className={(nav) => cx('menu-link', { active: nav.isActive })}
                    to={config.router.products}
                >
                    sản phẩm
                </NavLink>
            </li>
            <li className={cx('menu-item')}>
                <NavLink
                    onClick={handleClickMenuItem}
                    className={(nav) => cx('menu-link', { active: nav.isActive })}
                    to={config.router.contact}
                >
                    Liên hệ
                </NavLink>
            </li>
            {isAdmin && (
                <li className={cx('menu-item')}>
                    <NavLink
                        onClick={handleClickMenuItem}
                        className={(nav) => cx('menu-link', { active: nav.isActive })}
                        to={config.router.adminDashboard}
                    >
                        Sang trang quản lý
                    </NavLink>
                </li>
            )}
            {isLogin ? (
                <li className={cx('menu-item')}>
                    <NavLink
                        onClick={handleLogout}
                        className={(nav) => cx('menu-link', { active: nav.isActive })}
                        to="/login"
                    >
                        Đăng xuất
                    </NavLink>
                </li>
            ) : (
                <li className={cx('menu-item')}>
                    <NavLink
                        onClick={handleClickMenuItem}
                        className={(nav) => cx('menu-link', { active: nav.isActive })}
                        to="/login"
                    >
                        Đăng nhập
                    </NavLink>
                </li>
            )}
        </ul>
        // </div>
    );
}

MenuList.propTypes = {
    vertical: PropTypes.bool,
};

export default MenuList;
