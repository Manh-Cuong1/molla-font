import config from '~/config';
import AdminProducts from '../page/Admin/Products';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../page/Admin/Dashboard';

const privateRoutes = [
    // {
    //     path: config.router.admin,
    //     component: Dashboard,
    //     layout: AdminLayout,
    // },
    {
        path: config.router.adminDashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: config.router.adminProducts,
        component: AdminProducts,
        layout: AdminLayout,
    },
];

export default privateRoutes;
