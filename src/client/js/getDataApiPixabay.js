// 1. TODO: Run the Pixabay API

const getDataApiPixabay = async (urlAPIPixabay)=>{

    const res = await fetch(urlAPIPixabay)

    try {
  
        const dataAPIPixabay = await res.json();

        return dataAPIPixabay;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}

export {getDataApiPixabay}