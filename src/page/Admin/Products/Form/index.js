import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { BrandDataList } from "../../Brand/api";

const FormProduct = (props) => {
    // const data = BrandDataList();
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên sản phẩm',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="supplier"
                        label="Nhà phân phối"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn nhà phân phối',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn nhà phân phối"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.props?.children ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            // options={data?.brandsSelect}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn thương hiệu"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.props?.children ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            // options={data?.brandsSelect}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="brand"
                        label="Thương hiệu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thương hiệu',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn thương hiệu"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.props?.children ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            // options={data?.brandsSelect}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="importPrice"
                        label="Giá nhập"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá nhập ',
                            },
                            {
                                pattern: /^[0-9]*$/, // Chỉ cho phép nhập số từ 0-9
                                message: 'Vui lòng chỉ nhập số',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập nhập giá nhập" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="price"
                        label="Giá sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm',
                            },
                            {
                                pattern: /^[0-9]*$/, // Chỉ cho phép nhập số từ 0-9
                                message: 'Vui lòng chỉ nhập số',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập giá sản phẩm" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="Stock"
                        label="Số lượng nhập"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng hàng',
                            },
                            {
                                pattern: /^[0-9]*$/, // Chỉ cho phép nhập số từ 0-9
                                message: 'Vui lòng chỉ nhập số',
                            },
                        ]}
                    >
                        <Input placeholder="Vui lòng nhập số lượng hàng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="promotion"
                        label="Giảm giá theo %"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập % giảm giá',
                            },
                            {
                                pattern: /^[0-9]*$/, // Chỉ cho phép nhập số từ 0-9
                                message: 'Vui lòng chỉ nhập số',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value >= 0 && value <= 100) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        'Giá nhập phải nằm trong khoảng từ 0 đến 100',
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="Nhập % giảm giá" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Mô tả">
                        <CKEditor
                            cols="80"
                            rows="5"
                            editor={ClassicEditor}
                            data={props.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                props.setDescription(data);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default FormProduct;
