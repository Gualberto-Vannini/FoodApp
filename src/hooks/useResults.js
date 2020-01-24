import { useState, useEffect } from 'react';
import yelp from '../api/yelp';


export default () => {
    const [results, setResults] = useState ([]); // api content
    const [errorMessage, setErrorMessage] = useState(''); // err handle


    const searchApi = async (searchTerm) => {
        try {
            const response = await yelp.get('./search', {
                params: {
                    limit: 50,
                    term: searchTerm, 
                    location: 'san jose' // default location
                    
                }
            });
            setResults(response.data.businesses);
         } catch (err) {
             setErrorMessage('something went Wrong');
         }
    }

    useEffect(()=> {
        searchApi('pasta'); //default value on rendering first time
    },[])

    return [searchApi, results, errorMessage];

};