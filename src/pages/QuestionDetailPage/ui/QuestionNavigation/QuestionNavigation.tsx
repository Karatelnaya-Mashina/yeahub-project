import { useLocation, useNavigate } from 'react-router-dom';

import type { QuestionNavigationProps } from '../../model/QuestionNavigationProps.types';
import Icon from '@/shared/ui/Icon';
import styles from './QuestionNavigation.module.scss';

const QuestionNavigation = ({ id, listQuestions }: QuestionNavigationProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleChangeQuestion = (move: number) => {
		if (listQuestions.length === 0) return;

		const currentIndex = listQuestions.findIndex(q => q.id === Number(id));
		if (currentIndex === -1) return;

		const nextIndex = currentIndex + move;

		if (nextIndex < 0 || nextIndex >= listQuestions.length) return;

		const nextId = listQuestions[nextIndex].id;
		navigate(`/questions/${nextId}${location.search}`);
	};
	return (
		<div className={styles.btnWrap}>
			<button
				onClick={() => handleChangeQuestion(-1)}
				className={styles.btnWrap__arrow}
			>
				<Icon name='prevArrow' />
				<p>Предыдущий</p>
			</button>
			<button
				onClick={() => handleChangeQuestion(1)}
				className={styles.btnWrap__arrow}
			>
				<p>Следующий</p>
				<Icon name='nextArrow' />
			</button>
		</div>
	);
};

export default QuestionNavigation;
