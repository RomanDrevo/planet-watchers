import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import SkeletonImage from "antd/es/skeleton/Image";
import {setIsLoading} from "../store/uiStateSlice";


interface RootState {
    uiState: {
        isLoading: boolean;
        brightness: number
    };
}

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

export default Image