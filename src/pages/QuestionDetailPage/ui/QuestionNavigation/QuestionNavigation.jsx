import { useNavigate } from 'react-router-dom';

import Icon from '@/shared/ui/Icon';
import styles from './QuestionNavigation.module.scss';

const QuestionNavigation = ({ id, listQuestions }) => {
	const navigate = useNavigate();

	const handleChangeQuestion = move => {
		const currentIndex = listQuestions.findIndex(q => q.id === Number(id));

		const nextIndex = currentIndex + move;

		if (nextIndex < 0 || nextIndex >= listQuestions.length) return;

		const nextId = listQuestions[nextIndex].id;

		navigate(`/${nextId}`, {
			state: { questions: listQuestions },
		});
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
