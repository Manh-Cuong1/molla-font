import React from 'react';
import { Button, Drawer, Space } from 'antd';

const DrawerCustom = (props) => {
    const handleSubmit = () => {
        props.formRef.current.validateFields((error, values) => {
            if (!error) {
                props.setFormData(values);
                if (props.typeCommon === 'product') {
                    values.description = props.description;
                }
                props.onPressCreate(values);
                console.log('Form data:', values);
            } else {
                console.error('Error while submitting form:', error);
            }
        });
    };
    const handleClose = () => {
        if (props.formRef.current) {
            props.formRef.current.resetFields();
        }
        props.onClose();
        props.setFormData({});
    };
    return (
        <>
            <Drawer
                title={props.title}
                width={props.width ? props.width : 720}
                onClose={handleClose}
                open={props.open} // Thay open bằng visible
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleSubmit} type="primary">
                            Hoàn tất
                        </Button>
                    </Space>
                }
            >
                {props.children}
            </Drawer>
        </>
    );
};

export default DrawerCustom;
