import { useRouter } from 'next/navigation';

const Refresh = () => {
  const router = useRouter();
    router.refresh();
};
export default Refresh;