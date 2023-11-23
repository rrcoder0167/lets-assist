import { useRouter } from 'next/router';
const Refresh = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.reload();
  };
  return null;
};
export default Refresh;