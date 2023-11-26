import { useRouter } from 'next/router';

const Refresh = () => {
  const router = useRouter();
  router.reload();
};

export default Refresh;