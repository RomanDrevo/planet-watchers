import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {useGetProductsQuery} from "./store/productsApi";
import {Button, Spin} from "antd";
import {setIsLoading} from "./store/uiStateSlice";
import ImageComponent from './components/ImageComponent'

type Error = {
    message: string
}


// Constants for query parameters
const baseUrl = 'https://scihub.copernicus.eu/dhus';
const platform = 'Sentinel-2'
const cloudcoverage = '[0 TO 29]'
const coordinates = 'Intersects(POLYGON((34.76662356669317%2032.049496083697804,34.804270305187%2032.049496083697804,34.804270305187%2032.09911883991042,34.76662356669317%2032.09911883991042,34.76662356669317%2032.049496083697804)))'

function App() {

    const dispatch = useDispatch();

    const [startIndex, setStartIndex] = useState(0);

    const [uriQuery, setUriQuery] = useState(`${baseUrl}/search?q=footprint:"${coordinates}" AND platformname:"${platform}" AND cloudcoverpercentage:${cloudcoverage}&format=json`)

    const {data, isError, error, isFetching, isLoading} = useGetProductsQuery(uriQuery);

    const [nextChunkUrl, setNextChunkUrl] = useState<string>('')


    useEffect(() => {
        const nextLink = data?.feed.link.find((link: { rel: string }) => link.rel === 'next')
        setNextChunkUrl(nextLink?.href)
    }, [data])


    const handleReplace = () => {
        dispatch(setIsLoading(true))
        setStartIndex((prevIndex) => {
            const nextIndex = prevIndex + 2;
            if (nextIndex >= data?.feed.entry.length) {
                setUriQuery(nextChunkUrl);
                return nextIndex >= data?.feed.entry.length ? 0 : nextIndex;
            }
            return nextIndex;
        });

    };

    const products = data?.feed.entry || [];


    if (isError && 'status' in error) {
        return <div>Error: {error.status}</div>;
    }

    return (
        <div className="App">
            <Button type='primary' onClick={handleReplace}>Replace</Button>
            {
                !isLoading && !isFetching ? (
                    <div className='product-info-wrapper'>
                        <ImageComponent productId={products[startIndex]?.id}/>
                        <ImageComponent productId={products[startIndex + 1]?.id}/>
                    </div>
                ) :
                    <Spin spinning={true} size='large' />
            }
        </div>
    );
}

export default App;
