import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const uriQuery = 'https://scihub.copernicus.eu/dhus/search?q=footprint:"Intersects(POLYGON((34.76662356669317%2032.049496083697804,34.804270305187%2032.049496083697804,34.804270305187%2032.09911883991042,34.76662356669317%2032.09911883991042,34.76662356669317%2032.049496083697804)))" AND platformname:"Sentinel-2" AND cloudcoverpercentage:[0 TO 29]&format=json'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            headers.set(
                'Authorization',
                'Basic ' + btoa('romulus_hund' + ':' + '443512Prol@')
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (uriQuery) => uriQuery,
        }),
    }),
});

export const {  useGetProductsQuery } = api;
