import { yupResolver } from '@hookform/resolvers/yup';
import { Col, message, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Banner from '~/components/Banner';
import Container from '~/components/Container';
import config from '~/config';
import { clearAllCart } from '../Cart/cartSlice';
import styles from './Checkout.module.scss';
import CheckoutForm from './CheckoutForm';
import CheckoutSumary from './CheckoutSumary';
import { cartProductsSelector } from '../../redux/selector';
import ModalPayment from './ModalPayment';

const cx = classNames.bind(styles);

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup
    .object({
        name: yup.string().required('please enter your first name'),
        email: yup.string().email('please enter right format').required('please enter your email'),
        phoneNumber: yup
            .string()
            .required('please enter your phone number')
            .matches(phoneRegExp, 'Phone number is not valid'),
        address: yup.string().required('please enter your address'),
    })
    .required();

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const cartProducts = useSelector(cartProductsSelector);
    const shippingPrice = useSelector((state) => state.cart.shippingPrice);
    const subTotal = useSelector((state) => state.cart.subTotal);
    let today = new Date();
    const dateFindData = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            note: '',
        },
    });

    const onSubmit = (data) => {
        const body = {
            shippingInfo: {
                name: data.name,
                address: data.address,
                email: data.email,
                phoneNo: data.phoneNumber,
            },
            number: data.phoneNumber,
            orderItems: cartProducts.map((item) => ({
                name: item.name,
                price: item.price,
                promotion: item.promotion ? item.promotion : 0,
                quantity: item.quantity,
                image: item.image,
                product: item && item?._id,
                stock: item.Stock,
            })),
            itemsPrice: subTotal,
            shippingPrice: shippingPrice,
            totalPrice: subTotal + shippingPrice,
            dateFind: dateFindData,
            note: data.note,
        };
        //request data :))
        // reset('');
        // dispatch(clearAllCart());
        // navigate(config.router.cart);
        // message.success({
        //     content: `checkout successfuly! Thank for your order!`,
        //     style: {
        //         textTransform: 'capitalize',
        //     },
        // });
        // message.config({
        //     duration: 5,
        // });
        // setIsModalOpen(true);
        // navigate('/payment', { state: body });

        // Lưu vào Local Storage
        localStorage.setItem('checkoutData', JSON.stringify(body));
        setLoad(true);
        // navigate('/');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (load) {
            navigate('/payment');
        }
    }, [load]);
    return (
        <>
            <div className={cx('wrapper')}>
                <Banner title="checkout" />
                <form className={cx('content')} onSubmit={handleSubmit(onSubmit)}>
                    <Container>
                        <Row gutter={[{ xs: 0, md: 10, lg: 20 }, { xs: 0 }]}>
                            <Col xs={24} md={16}>
                                <CheckoutForm register={register} errors={errors} />
                            </Col>
                            <Col xs={24} md={8}>
                                <CheckoutSumary />
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        </>
    );
}
