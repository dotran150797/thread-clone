import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const useCurrentUser = () => {
  const currentUser = useQuery(api.users.getCurrentUser);
  return currentUser;
};

export default useCurrentUser;
