import { useContext } from 'react';
import { ResponseContext } from '../context/ResponseContext';

const useResponseContext = () => {
  const context = useContext(ResponseContext);
  if (context === undefined) {
    throw new Error(
      'useResponseContext must be used within a ResponseProvider',
    );
  }
  return context;
};

export default useResponseContext;
