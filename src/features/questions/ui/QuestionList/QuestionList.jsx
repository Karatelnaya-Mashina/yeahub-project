import { useDataQuestions } from '../../api/useDataQuestions';
import QuestionCard from '../QuestionCard/QuestionCard';
import PagesQuestions from '../../../../features/questions/ui/PagesQuestions/PagesQuestions';

import Icon from '../../../../shared/assets/icons/Icon';

import styles from './QuestionList.module.scss';

const QuestionList = ({ currentPage = 1, onPageChange, openModal }) => {
	const {
		filteredQuestions: questions,
		total,
		initialLoading: loading,
		error,
		handleResetFilters,
	} = useDataQuestions();

	if (loading) {
		return (
			<div className={styles.loading}>
				<div className={styles.spinner}></div>
				<p>Загрузка вопросов...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.errorQuestions}>
				Ошибка загрузки: {error?.message}. Статус: {error.statusCode}
			</div>
		);
	}

	if (questions?.length === 0) {
		return (
			<div className={styles.empty}>
				<p>Вопросы не найдены</p>
				<p className={styles.emptyHint}>
					Попробуйте изменить параметры фильтрации
				</p>
				{handleResetFilters && (
					<button className={styles.resetButton} onClick={handleResetFilters}>
						♻ Сбросить все фильтры
					</button>
				)}
			</div>
		);
	}

	return (
		<div className={styles.list}>
			<div className={styles.list__header}>
				<h1 className={styles.list__title}>Вопросы</h1>
				<div className={styles.list__filter} onClick={openModal}>
					<Icon name='openModal' />
				</div>
			</div>

			<div className={styles.card}>
				{questions?.map(question => (
					<QuestionCard
						key={question.id}
						question={question}
						questions={questions}
					/>
				))}
			</div>

			<PagesQuestions
				total={total}
				currentPage={currentPage}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default QuestionList;
