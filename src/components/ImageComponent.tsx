import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {Skeleton} from 'antd'
import {setIsLoading} from "../store/uiStateSlice";
import {useGetImageQuery} from "../store/productsApi";

const {Image} = Skeleton


interface RootState {
    uiState: {
        isLoading: boolean;
        brightness: number
    };
}

const ImageComponent = React.memo(({productId}: { productId: string }) => {

    const { data: imageBlob } = useGetImageQuery(`https://scihub.copernicus.eu/dhus/odata/v1/Products('${productId}')/Products('Quicklook')/$value`);

    const [img, setImg] = useState<string >();  // Adjusted line

    useEffect(() => {
        if (imageBlob) {
            const imageObjectURL = URL.createObjectURL(imageBlob);

            setImg(imageObjectURL);
        }
    }, [imageBlob]);

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
                {isLoading && <Image active={true} className='skeleton-loader'/>}
                <img
                    src={img}
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

export default ImageComponent