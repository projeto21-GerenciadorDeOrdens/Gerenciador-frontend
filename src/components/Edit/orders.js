import useToken from '../../hooks/useToken';
import { searchOrders } from '../../services/orders';
import { useEffect } from 'react';

export default function get() {
  const token = useToken();
  useEffect(() => {
    async function getOrders() {
      const response = await searchOrders(token);
      return response;
    }
    return getOrders();
  }, []);
}
