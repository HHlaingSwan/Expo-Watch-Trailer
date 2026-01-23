import { useCallback, useEffect, useState } from "react";

type FetchFunction = () => Promise<any>;

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

const useFetch = (
  fetchFunction: FetchFunction,
  autoFetch = true,
): UseFetchState<any> => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.log("Fetch error:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
