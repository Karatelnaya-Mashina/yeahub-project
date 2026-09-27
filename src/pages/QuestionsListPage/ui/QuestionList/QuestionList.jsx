import QuestionCard from '../QuestionCard/QuestionCard';
import Pagination from '../Pagination/Pagination';

import Icon from '@/shared/ui/Icon';

import styles from './QuestionList.module.scss';

const QuestionList = ({
	questions,
	total,
	loading,
	error,
	onReset,
	currentPage,
	onPageChange,
	openModal,
}) => {
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
				{onReset && (
					<button className={styles.resetButton} onClick={onReset}>
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

			<Pagination
				total={total}
				currentPage={currentPage}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default QuestionList;
