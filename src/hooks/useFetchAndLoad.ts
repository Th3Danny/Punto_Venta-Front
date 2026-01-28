import type { AxiosCall } from '@/models';
import type { AxiosResponse } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const callEndpoint = useCallback(async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controllerRef.current = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  }, []);

  const cancelEndpoint = useCallback(() => {
    setLoading(false);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, [cancelEndpoint]);

  return { loading, callEndpoint };
};

export default useFetchAndLoad;
