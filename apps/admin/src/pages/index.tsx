import { Navigate } from 'react-router';
import { ROUTES } from '@/utils/constants';

const Index = () => {
	return <Navigate to={ROUTES.LOGIN} replace />;
};

export default Index;
