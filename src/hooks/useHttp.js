import { useEffect, useState } from "react";
import axios from '../core/axios';

const useHttp = (url='', options, dependencies = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  console.log('am in usehttp');

  useEffect(() => {
       setIsLoading(true);
        axios(url,options).then(response => {
            console.log(response);
            setResponse(response.data);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            setError(err.message)
        })
  }, dependencies);

  return [isLoading, response, error];
}

export default useHttp;
