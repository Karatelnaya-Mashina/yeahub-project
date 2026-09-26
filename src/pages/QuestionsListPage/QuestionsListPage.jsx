import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import QuestionList from '../../features/questions/ui/QuestionList/QuestionList';
import FilterSidebar from '../../features/questions/ui/FilterSidebar/FilterSidebar';

import Modal from '../../shared/ui/Modal/Modal';

import styles from './QuestionsListPage.module.scss';

export default function QuestionsListPage() {
	const [searchParams, setSearchParams] = useSearchParams();

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
