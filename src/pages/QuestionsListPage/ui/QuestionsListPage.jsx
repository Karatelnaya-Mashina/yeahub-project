import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useQuestions } from '@/entities/questions';

import QuestionList from './QuestionList/QuestionList';
import { FilterSidebar } from '@/widgets/FilterSidebar';

import styles from './QuestionsListPage.module.scss';

export default function QuestionsListPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		filteredQuestions,
		total,
		initialLoading,
		error,
		handleResetFilters,
	} = useQuestions();

	const [modal, setModal] = useState(false);

	const currentPage = parseInt(searchParams.get('page') || '1', 10);

	const handlePageChange = useCallback(
		page => {
			const params = new URLSearchParams(searchParams);
			params.set('page', page.toString());
			setSearchParams(params, { replace: true });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[searchParams, setSearchParams],
	);

	const handleOpenModal = useCallback(() => {
		setModal(prev => !prev);
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<QuestionList
					questions={filteredQuestions}
					total={total}
					loading={initialLoading}
					error={error}
					onReset={handleResetFilters}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					openModal={handleOpenModal}
				/>

				{!modal && <FilterSidebar />}

				{modal && <FilterSidebar modal={modal} />}
			</main>
		</div>
	);
}
