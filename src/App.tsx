import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';




interface Product {
  id: number;
  uuid: string;

}

// const uriQuery = 'https://scihub.copernicus.eu/dhus/api/stub/products?filter=(%20footprint:%22Intersects(POLYGON((34.76662356669317%2032.049496083697804,34.804270305187%2032.049496083697804,34.804270305187%2032.09911883991042,34.76662356669317%2032.09911883991042,34.76662356669317%2032.049496083697804)))%22%20)%20AND%20(%20%20(platformname:Sentinel-2%20AND%20cloudcoverpercentage:[0%20TO%2030]))&offset=0&limit=25&sortedby=ingestiondate&order=desc&format=json'



const uriQuery = 'https://scihub.copernicus.eu/dhus/search?q=footprint:"Intersects(POLYGON((34.76662356669317%2032.049496083697804,34.804270305187%2032.049496083697804,34.804270305187%2032.09911883991042,34.76662356669317%2032.09911883991042,34.76662356669317%2032.049496083697804)))" AND platformname:"Sentinel-2" AND cloudcoverpercentage:[0 TO 29]&format=json'

const username = "romulus_hund";
const password = "443512Prol@";



function App() {

  const [startIndex, setStartIndex] = useState(0);

  const handleReplace = () => {
    setStartIndex((prevIndex) => {
      const nextIndex = prevIndex + 2;
      if (nextIndex >= products.length) {
        console.log('No more data...');

        getData(nextChunkUrl)
        return nextIndex >= products.length ? 0 : nextIndex;
      }
      return nextIndex;  // otherwise, update to the next index
    });

  };

  const [products, setProducts] = useState<Product[]>([])
  const [nextChunkUrl, setNextChunkUrl] = useState<string>('')


  const getData = async (uriQuery: string) => {
    try {
      const res = await fetch(uriQuery, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(username + ":" + password)
        }
      })
      const data =  await res.json()
      console.log('--->>>data: ', data)

      const nextLink = data.feed.link.find((link: {rel: string}) => link.rel === 'next')

      setNextChunkUrl(nextLink.href)
      setProducts(data.feed.entry);
    }
    catch (e){
      console.log('--->>>error: ', e)
    }

  }

  useEffect(()=> {
    getData(uriQuery)
  }, [])

  console.log('--->>>startIndex : ', startIndex)
  // console.log('--->>>nextChunk : ', nextChunk)

  return (
    <div className="App">
      <div>
        <button onClick={handleReplace}>Replace</button>
        <div style={{display: 'flex'}}>
          <div>
            <div>ID 1: {products[startIndex]?.id}</div>
            <img src={`https://scihub.copernicus.eu/dhus/odata/v1/Products('${products[startIndex]?.id}')/Products('Quicklook')/$value`} />
          </div>
          <div>
            <div>ID 2: {products[startIndex + 1]?.id}</div>
            <img src={`https://scihub.copernicus.eu/dhus/odata/v1/Products('${products[startIndex + 1]?.id}')/Products('Quicklook')/$value`} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
