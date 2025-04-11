import { message } from 'antd';
import { usePostData } from '../../hooks/services/usePostApi';
import { ORDERS } from '../../constants/api';

export const CreateOrder = () => {
    const alertSuccess = (value) => {
        if (value.status === 201) {
            message.success('Đơn hàng của bạn đã được đặt thành công');
            localStorage.removeItem('checkoutData');
        }
    };
    const alertFail = (value) => {
        message.error(value.statusText);
    };
    const postData = usePostData(null, true, null, false, false, alertSuccess, alertFail);
    const create = (payload) => {
        return postData._postData(`${ORDERS.CREATE}`, payload);
    };
    const createNewOrder = async (payload) => {
        console.log(payload);
        await create(payload);
    };

    return createNewOrder;
};
