// 1. TODO: Run the Geonames API

let dataAPIGeonames;

const getDataApiGeonames = async (urlAPIGeonames)=>{

    const res = await fetch(urlAPIGeonames)

    try {
  
        dataAPIGeonames = [];

        dataAPIGeonames = await res.json();
        
        console.log(dataAPIGeonames)
        
        return dataAPIGeonames;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}

export {getDataApiGeonames};
export {dataAPIGeonames};