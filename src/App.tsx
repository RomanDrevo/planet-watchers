import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useGetProductsQuery} from "./store/productsApi";
import {Button} from "antd";
import {setIsLoading} from "./store/uiStateSlice";
import SkeletonImage from "antd/es/skeleton/Image";


interface RootState {
    uiState: {
        isLoading: boolean;
        brightness: number
    };
}

const baseUrl = 'https://scihub.copernicus.eu/dhus';
const platform = 'Sentinel-2'
const cloudcoverage = '[0 TO 29]'
const coordinates = 'Intersects(POLYGON((34.76662356669317%2032.049496083697804,34.804270305187%2032.049496083697804,34.804270305187%2032.09911883991042,34.76662356669317%2032.09911883991042,34.76662356669317%2032.049496083697804)))'


const Image = React.memo(({productId}: { productId: string }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.uiState.isLoading);

    const [brightness, setBrightness] = useState(1);

    const handleIncreaseBrightness = () => {
        setBrightness(prevBrightness => prevBrightness + 0.1);  // increment brightness by 10%
    };

    const handleDecreaseBrightness = () => {
        setBrightness(prevBrightness => prevBrightness - 0.1);  // increment brightness by 10%
    };

    return (
        <div>
            <>
                <h5>Brightness:</h5>
                <Button onClick={handleIncreaseBrightness} style={{marginRight: 10}}>+</Button>
                <Button onClick={handleDecreaseBrightness} style={{marginBottom: 10}}>-</Button>
            </>

            <div className='image-wrapper'>
                {isLoading && <SkeletonImage active={true} className='skeleton-loader'/>}
                <img
                    src={`https://scihub.copernicus.eu/dhus/odata/v1/Products('${productId}')/Products('Quicklook')/$value`}
                    onLoad={() => dispatch(setIsLoading(false))}
                    style={{
                        display: isLoading ? 'none' : 'block',
                        filter: `brightness(${brightness})`
                    }}
                    alt=""
                />
            </div>

        </div>
    );
});


function App() {

    const dispatch = useDispatch();

    const [startIndex, setStartIndex] = useState(0);

    const [uriQuery, setUriQuery] = useState(`${baseUrl}/search?q=footprint:"${coordinates}" AND platformname:"${platform}" AND cloudcoverpercentage:${cloudcoverage}&format=json`)

    const {data, isError, error} = useGetProductsQuery(uriQuery);

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
                console.log('No more data...');
                setUriQuery(nextChunkUrl);
                return nextIndex >= data?.feed.entry.length ? 0 : nextIndex;
            }
            return nextIndex;
        });

    };

    const products = data?.feed.entry || [];


    if (isError) { // @ts-ignore
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <Button type='primary' onClick={handleReplace}>Replace</Button>

            <div className='product-info-wrapper'>
                <Image productId={products[startIndex]?.id}/>
                <Image productId={products[startIndex + 1]?.id}/>
            </div>
        </div>
    );
}

export default App;
