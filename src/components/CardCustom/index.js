import { Button, Card, Input, Select, Space } from 'antd';
import React from 'react';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
const CardCustom = (props) => {
    const onChangeSelectBrand = (value) => {
        props.setBrandSearch(value);
    };
    const handleChangeStatus = (value) => {
        props.setStatus(value);
    };
    return (
        <Card
            title={props.title}
            extra={
                <Space>
                    {props.mode === 0 && (
                        <>
                            {/* <Select
                showSearch
                placeholder="Tìm kiếm theo danh mục"
                optionFilterProp="children"
                // onChange={onChangeSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // options={brands}
              /> */}
                            <Select
                                showSearch
                                placeholder="Tìm kiếm theo thương hiệu"
                                optionFilterProp="children"
                                onChange={onChangeSelectBrand}
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={props.brands}
                                style={{ width: 220 }}
                                value={props.brandSearch}
                            />
                            <Input
                                placeholder="Tìm kiếm theo tên "
                                value={props.keyword}
                                onChange={(e) => props.setKeyword(e.target.value)}
                            />
                        </>
                    )}

                    {props.mode === 1 && (
                        <Input
                            placeholder="Tìm kiếm theo tên "
                            value={props.keyword}
                            onChange={(e) => props.setKeyword(e.target.value)}
                        />
                    )}
                    {props.mode === 2 && (
                        <>
                            {/* <Input
                placeholder="Tìm kiếm theo ngày"
                onChange={(e) => props.setMonth(e.target.value)}
                value={props.monAndDate}
              /> */}
                            <Input
                                placeholder="Tìm kiếm theo số điện thoại"
                                onChange={(e) => props.setNumber(e.target.value)}
                                value={props.number}
                                style={{ width: 210 }}
                            />
                            <Select
                                defaultValue="Chọn trạng thái"
                                onChange={handleChangeStatus}
                                value={props.status === '' ? 'Chọn trạng thái' : props.status}
                                style={{ width: 150 }}
                                options={[
                                    {
                                        value: 'Đang giao',
                                        label: 'Đang giao',
                                    },
                                    {
                                        value: 'Đang xử lý',
                                        label: 'Đang xử lý',
                                    },
                                    {
                                        value: 'Đã hoàn thành',
                                        label: 'Đã hoàn thành',
                                    },
                                ]}
                            />
                        </>
                    )}

                    <Button type="primary" onClick={props.onRefresh} icon={<ReloadOutlined />}>
                        Làm mới
                    </Button>
                    <Button type="primary" onClick={props.showDrawer} icon={<PlusOutlined />}>
                        Thêm mới
                    </Button>
                </Space>
            }
        >
            {props.children}
        </Card>
    );
};

export default CardCustom;
