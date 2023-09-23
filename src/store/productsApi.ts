import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

export const api = createApi({
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            headers.set(
                'Authorization',
                'Basic ' + btoa(username + ':' + password)
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (uriQuery) => uriQuery,
        }),
        getImage: builder.query({
            query: (uriQuery) => ({
                url: uriQuery,
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {  useGetProductsQuery, useGetImageQuery } = api;
