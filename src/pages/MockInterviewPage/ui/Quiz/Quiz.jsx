import { useLocation } from 'react-router-dom';

const Quiz = () => {
	const location = useLocation();
	console.log(location.state);

	return <div>Quiz</div>;
};

export default Quiz;
