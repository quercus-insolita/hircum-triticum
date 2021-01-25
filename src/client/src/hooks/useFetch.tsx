import { useState, useEffect } from 'react';

import { callWebApi } from 'helpers/webApi.helper';

function useFetch(initialEndpoint: string, initialParams, skip: boolean = false) {
  const [endpoint, updateEndpoint] = useState(initialEndpoint);
  const [params, updateParams] = useState(initialParams);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (skip) return;

      setIsLoading(true);
      try {
        const response = await callWebApi({
          endpoint,
          ...params
        });
        const result = await response.json();

        setData(result);
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, params, skip]);

  return { data, isLoading, hasError, errorMessage, updateEndpoint, updateParams };
}

export default useFetch;
