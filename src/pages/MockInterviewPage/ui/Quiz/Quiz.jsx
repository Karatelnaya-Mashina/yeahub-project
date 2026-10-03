import { useFiltersQuiz } from '@/entities/quiz/model/useFiltersQuiz';

const Quiz = () => {
	const { filters } = useFiltersQuiz();
	console.log(filters);

	return <div>Quiz</div>;
};

export default Quiz;
