import { useEffect, useState } from 'react';
import { message } from 'antd';
import { BRANDS, CATEGORIES, PRODUCTS } from '../../constants/api';
import { useGetData } from '../../hooks/services/useGetApi';
import { useDeleteData } from '../../hooks/services/useDeleteApi';
import { usePostData } from '../../hooks/services/usePostApi';

export const FilterHomeProducts = (category, keyword) => {
    const data = [];

    // const getProducts = useGetData(`${PRODUCTS.LIST}`);
    const getProducts = useGetData(
        keyword
            ? category !== 'all'
                ? `${PRODUCTS.LIST}?keyword=${keyword}&category=${category}`
                : `${PRODUCTS.LIST}?keyword=${keyword}`
            : category !== 'all'
            ? `${PRODUCTS.LIST}?category=${category}`
            : `${PRODUCTS.LIST}`,
    );
    const getCategories = useGetData(`${CATEGORIES.LIST}`);
    useEffect(() => {
        let isCurrent = true;
        if (!!isCurrent) {
            void getProducts._getData();
        }
        void getCategories._getData();
        return () => {
            isCurrent = false;
        };
    }, [category]);
    const categories = getCategories.data.categories;
    getProducts.data.products &&
        getProducts.data.products.forEach((item, i) => {
            data.push({
                _id: item._id,
                number: i + 1,
                name: item.name,
                image: item?.images[0]?.url,
                price: item.price - (item.price * item.promotion) / 100,
                oldPrice: item.price,
                description: item.description,
                promotion: item.promotion,
                importPrice: item.importPrice,
                Stock: item.Stock,
                ratings: item.ratings,
                numOfReviews: item.numOfReviews,
                category: item.category,
                supplier: item.supplier,
                brand: item.brand,
                createdAt: item.createdAt,
            });
        });
    const productsCount = getProducts.data?.productsCount;
    const isLoading = getProducts?.isLoading;
    const Pr = { data, categories, productsCount, isLoading };
    if (getProducts.isLoading === false && getProducts.data.success === true) {
        return Pr;
    }
};

export const ProductDataList = (keyword, brandSearch, refreshTable) => {
    const data = [];
    const getProducts = useGetData(
        brandSearch
            ? `${PRODUCTS.LIST}?keyword=${keyword}&brand=${brandSearch}`
            : `${PRODUCTS.LIST}?keyword=${keyword}`,
    );
    const getBrands = useGetData(`${BRANDS.LIST}`);
    useEffect(() => {
        let isCurrent = true;
        if (!!isCurrent) {
            void getProducts._getData();
        }
        void getBrands._getData();
        return () => {
            isCurrent = false;
        };
    }, [keyword, brandSearch, refreshTable]);
    const brands = [{ value: '', label: 'Tất cả' }];
    getBrands.data.brand &&
        getBrands.data.brand.forEach((item, i) => {
            brands.push({
                value: item.name,
                label: item.name,
            });
        });
    getProducts.data.products &&
        getProducts.data.products.forEach((item, i) => {
            data.push({
                _id: item._id,
                number: i + 1,
                name: item.name,
                price: item.price - (item.price * item.promotion) / 100,
                promotion: item.promotion,
                importPrice: item.importPrice,
                Stock: item.Stock,
                description: item.description,
                category: item.category,
                supplier: item.supplier,
                brand: item.brand,
                createdAt: item.createdAt,
            });
        });
    const Pr = { data, brands };
    if (getProducts.isLoading === false && getProducts.data.success === true) {
        return Pr;
    }
};

export const ProductDataDelete = (refreshTable, setRefreshTable) => {
    const alertSuccess = () => {
        message.success('Xóa thành công');
        setRefreshTable(!refreshTable);
    };
    const alertFail = () => {
        message.error('Thất bại');
    };
    const deleteData = useDeleteData(null, true, null, false, false, alertSuccess, alertFail);
    const deleteById = (id) => {
        return deleteData._deleteData(`${PRODUCTS.PRODUCT}${id}`);
    };
    const deleteM = async (value) => {
        await deleteById(value);
    };
    return deleteM;
};
export const ProductDataPost = (refreshTable, setRefreshTable, setOpen) => {
    const alertSuccess = (value) => {
        if (value.status === 200) {
            message.success('Thêm thành công');
            setRefreshTable(!refreshTable);
            setOpen(false);
        }
    };
    const alertFail = (value) => {
        message.error(value.statusText);
    };
    const postData = usePostData(null, true, null, false, false, alertSuccess, alertFail);
    const create = (payload) => {
        return postData._postData(`${PRODUCTS.CREATE}`);
    };
    const postProduct = async (payload) => {
        await create(payload);
    };
    return postProduct;
};
