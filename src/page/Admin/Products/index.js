import React, { createRef, useState } from 'react';
import CardCustom from '../../../components/CardCustom';
import TableCustom from '../../../components/TableCustom';
import { columns } from './column';
import DrawerCustom from '../../../components/DrawerCustom';
import FormCustom from '../../../components/FormCustom';
import FormProduct from './Form';

const AdminProducts = () => {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [mode, setMode] = useState(0);
    const [formData, setFormData] = useState({});
    const formRef = createRef();
    const [brandSearch, setBrandSearch] = useState();
    const [refreshTable, setRefreshTable] = useState(false);
    const data = [];
    const createProduct = () => {};
    //   const data = ProductDataList(keyword, brandSearch, refreshTable);
    //   const deleteProductData = ProductDataDelete(refreshTable, setRefreshTable);
    //   const createProduct = ProductDataPost(refreshTable, setRefreshTable, setOpen);
    const deleteProductData = () => {};
    const [description, setDescription] = useState('');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onRefresh = () => {
        setKeyword('');
        setBrandSearch();
    };

    return (
        <CardCustom
            title="Danh sách sản phẩm"
            showDrawer={showDrawer}
            onRefresh={onRefresh}
            setKeyword={setKeyword}
            keyword={keyword}
            mode={0}
            //   brands={data?.brands}
            setBrandSearch={setBrandSearch}
            brandSearch={brandSearch}
        >
            <TableCustom
                columns={columns}
                dataSource={data}
                deleteM={deleteProductData}
                showDrawer={showDrawer}
                setMode={setMode}
                mode={0}
                refreshTable={refreshTable}
            />
            <DrawerCustom
                title={mode === 0 ? 'Thêm mới sản phẩm' : 'Chi tiết sản phẩm'}
                mode={mode}
                onClose={onClose}
                open={open}
                formRef={formRef}
                setFormData={setFormData}
                description={description}
                onPressCreate={createProduct}
                width={720}
                typeCommon="product"
            >
                <FormCustom formRef={formRef} initialValues={formData}>
                    <FormProduct setDescription={setDescription} description={description} />
                </FormCustom>
            </DrawerCustom>
        </CardCustom>
    );
};

export default AdminProducts;
