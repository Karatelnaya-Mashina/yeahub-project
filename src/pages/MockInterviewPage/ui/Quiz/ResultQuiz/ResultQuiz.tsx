import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import CardsQuiz from './CardsQuiz';
import Modal from '@/shared/ui/Modal/Modal';

import Icon from '@/shared/ui/Icon';
import modalContainer from '@/shared/assets/images/modalContainer.webp';
import styles from './ResultQuiz.module.scss';

const ResultQuiz = () => {
	const { answers, questions } = useSelector(state => state.quiz);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const start = setTimeout(() => {
			setIsModalOpen(true);
		}, 5000);
		return () => clearTimeout(start);
	}, []);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const hasResult = questions.length > 0;

	if (!hasResult) {
		return (
			<div className={styles.empty}>
				<h2>Результат не найден</h2>
				<p>Пройдите собеседование, чтобы увидеть статистику.</p>
				<Link to='/mock-interview'>Начать заново</Link>
			</div>
		);
	}

	return (
		<div className={styles.resultQuiz}>
			<div className={styles.studyMode}>
				<header className={styles.header}>
					<h4 className={styles.header_title}>Умный режим изучения вопросов</h4>
					<button className={styles.header_btn}>
						<p>Посмотреть статистику</p>
						<Icon name='nextArrow' />
					</button>
				</header>
				<Dashboard />
			</div>
			<div className={styles.listCompleted}>
				<h4 className={styles.listCompleted_title}>
					Список пройденных вопросов собеседования
				</h4>
				<div className={styles.listCompleted_items}>
					{questions.map(question => (
						<CardsQuiz
							key={question.id}
							question={question}
							answers={answers}
						/>
					))}
				</div>
			</div>
			{isModalOpen && (
				<Modal
					className={`${styles.modalQuiz} ${styles.modalOverlay}`}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				>
					<img src={modalContainer} alt='modal' width={702} height={402} />
				</Modal>
			)}
		</div>
	);
};

export default ResultQuiz;
