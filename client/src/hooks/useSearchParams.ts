import { useLocation } from 'react-router-dom';
import qs from 'qs';
const useSearchParams = () => {
    const location = useLocation();
    return qs.parse(location.search, { ignoreQueryPrefix: true });
};

export default useSearchParams;
