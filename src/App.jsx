import React,{useState,useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
const key = '17990356-e77be25a50ff230b7d6b7eac4';


function App() {

  const [images,setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term,setTerm] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${term}&image_type=photo&per_page=30`)
      const data = await response.json()
      setImages(data.hits)
      setIsLoading(false)
    }
    
    fetchData();
  },[term])
  

  
  return (
    <div className='container mx-auto'>
      <ImageSearch  searchText ={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32 ">No Images Found</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32 ">Loading... Please Wait</h1>:
      <div className="grid grid-cols-3 gap-4">
        {
        images.map(image => (
          image.webformatURL &&
          <ImageCard key={image.id} image={image} />
        ))
        }
      </div>
}
    </div>
    
  );
}

export default App;
