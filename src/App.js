import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import { changeDeviceMode, changeSize } from './redux/deviceModeSlice';
import publicRoutes from './routes';
import privateRoutes from './routes/privateRoutes';
import LoginForm from './layouts/Auth/LoginForm';
import Register from './layouts/Auth/Register';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './page/Checkout/Payment';

function App() {
    const dispatch = useDispatch();
    const [stripeApiKey, setStripeApiKey] = useState('');

    // ✅ Hàm lấy Stripe API Key từ backend
    async function getStripeApiKey() {
        try {
            const response = await axios.get('https://6c4f-203-210-131-23.ngrok-free.app/api/v1/stripeapikey');
            const { stripeApiKey } = response.data;

            if (!stripeApiKey) {
                console.error('❌ Không nhận được Stripe API Key từ server.');
                return;
            }

            console.log("✅ Stripe API Key:", stripeApiKey);
            setStripeApiKey(stripeApiKey);
        } catch (error) {
            console.error("❌ Lỗi gọi API Stripe:", error.message || error);
        }
    }

    // ✅ Gọi API khi load ứng dụng
    useEffect(() => {
        getStripeApiKey();
    }, []);

    // ✅ Theo dõi size màn hình
    useEffect(() => {
        dispatch(changeSize(window.innerWidth));
        dispatch(changeDeviceMode(window.innerWidth >= 992 ? 'large' : 'small'));

        const handleResize = () => {
            dispatch(changeSize(window.innerWidth));
            dispatch(changeDeviceMode(window.innerWidth >= 992 ? 'large' : 'small'));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ✅ Component chứa thanh toán Stripe
    const ElementsCheckout = () => {
        if (!stripeApiKey) {
            return null; // hoặc <Spin /> nếu bạn muốn loading
        }
    
        return (
            <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
            </Elements>
        );
    };

    return (
        <GlobalStyle>
            <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route) => {
                    const Component = route.component;
                    const Layout = route.layout;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    <Component />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* Private Routes */}
                {privateRoutes.map((route) => {
                    const Component = route.component;
                    const Layout = route.layout;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    <Component />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* Auth Routes */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/payment" element={<ElementsCheckout />} />
            </Routes>
        </GlobalStyle>
    );
}

export default App;
