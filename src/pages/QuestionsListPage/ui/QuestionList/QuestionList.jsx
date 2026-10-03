import QuestionCard from '../QuestionCard/QuestionCard';
import Pagination from '../Pagination/Pagination';
import QuestionListSkeleton from '../QuestionListSkeleton/QuestionListSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

import Icon from '@/shared/ui/Icon';

import styles from './QuestionList.module.scss';

const QuestionList = ({
	questions,
	total,
	loading,
	error,
	onRetry,
	onReset,
	currentPage,
	onPageChange,
	openModal,
}) => {
	if (loading) return <QuestionListSkeleton count={5} />;

	if (error) {
		return (
			<ErrorState
				title='Не удалось загрузить вопросы'
				error={error}
				onRetry={onRetry}
				onReset={onReset}
			/>
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
					<QuestionCard key={question.id} question={question} />
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
