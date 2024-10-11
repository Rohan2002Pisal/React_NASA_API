import {useEffect, useState} from "react"
import Footer from './components/Footer'
import Main from './components/Main'
import SideBar from './components/SideBar'

function App() {

  const [data , setdata] = useState(null);

  const[isLoading , setisLoading] = useState(false);
  
  const [showModel ,setshowModel] = useState(false);

  function handleToggleModel() {
    setshowModel(!showModel)
  }

  useEffect(() => {
  async function fetchAPIData() {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    console.log("NASA API Key:", NASA_KEY);

    const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`



    // Caching is IMP

    const today = (new Date()).toDateString()
 
    const localKey = `NASA-${today}`

    if(localStorage.getItem(localKey)){
      const Apidata = JSON.parse(localStorage.getItem(localKey))
      setdata(Apidata);
      console.log("Fetched from cache today" , Apidata);
      return
    }

    localStorage.clear()

    try{
   
       const res = await fetch(url);
       if (!res.ok) {
        throw new Error("Failed to fetch data from NASA API");
      }
       const Apidata = await res.json();
     

       localStorage.setItem(localKey , JSON.stringify(Apidata))

       setdata(Apidata);

       console.log("Fetched from API:", Apidata);
       

    }catch(error){
      console.log(error.message)
    }
  }

  fetchAPIData();

  },[])

  return (
    <>
    
     {data ? (<Main data={data} /> ) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
     ) }
     
     {showModel && (<SideBar data={data} handleToggleModel={handleToggleModel} />)}

     
    { data && (<Footer data={data} handleToggleModel={handleToggleModel}  /> )}

    </>
  )
}

export default App
