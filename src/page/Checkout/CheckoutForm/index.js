import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import InputField from '~/components/InputField';
import styles from '.././Checkout.module.scss';

const cx = classNames.bind(styles);

export default function CheckoutForm({ register, errors }) {
    return (
        <div>
            <h3 className={cx('title')}>Thông tin thanh toán</h3>
            <div>
                <Row gutter={[{ xs: 0, md: 15, lg: 20 }]}>
                    <Col xs={24} md={24}>
                        <InputField
                            register={register}
                            label="Họ tên"
                            name="name"
                            isRequire
                            errors={errors}
                        />
                    </Col>
                </Row>
                <InputField
                    register={register}
                    label="email"
                    name="email"
                    isRequire
                    errors={errors}
                />
                <InputField
                    register={register}
                    label="Số điện thoại"
                    name="phoneNumber"
                    isRequire
                    errors={errors}
                />
                <InputField
                    register={register}
                    label="Địa chỉ"
                    name="address"
                    isRequire
                    errors={errors}
                />
                <InputField
                    register={register}
                    label="Ghi chú"
                    name="note"
                    textaria
                    placeholder="Nhập nội dung..."
                    errors={errors}
                />
            </div>
        </div>
    );
}
