import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetQuestionIdQuery } from '@/entities/questions';

import Icon from '@/shared/ui/Icon';
import styles from './QuestionDetailPage.module.scss';

const QuestionDetailPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [fullHeight, setFullHeight] = useState(0);
	const contentRef = useRef();
	const maxHeightDescription = 785;

	const { id } = useParams();

	const { data: question, isLoading, isError } = useGetQuestionIdQuery(id);

	const listQuestions = location.state.questions;

	useEffect(() => {
		if (contentRef.current) {
			const height = contentRef.current.scrollHeight;
			setFullHeight(height);

			const isOverflow = height > maxHeightDescription;
			setIsOverflowing(isOverflow);
		}
	}, [question]);

	const handlePrevPage = () => {
		navigate(-1);
	};

	const handleToggleOverflow = () => {
		setIsExpanded(prev => !prev);
	};

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
		<div className={styles.detail}>
			<button onClick={handlePrevPage} className={styles.prev}>
				<Icon name='prevArrow' />
				<p>Назад</p>
			</button>
			<div className={styles.container}>
				<main className={styles.main}>
					<header className={styles.header}>
						<div className={styles.header_icon}>
							<Icon name='imgTitle' />
						</div>
						<div className={styles.header_heading}>
							<h2 className={styles.header_title}>{question?.title}</h2>
							<p>Вопрос проверяет знание React под капотом</p>
						</div>
					</header>
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

					<div
						className={`${styles.description} ${isExpanded ? styles.expanded : styles.close}`}
					>
						<div className={styles.description__shortAnswer}>
							<p className={styles.description__shortAnswer_title}>
								Краткий ответ:
							</p>
							<p className={styles.description__shortAnswer_short}>
								{question?.shortAnswer}
							</p>
						</div>
						<div
							ref={contentRef}
							className={`${styles.description__longAnswer} ${isExpanded ? styles.expanded : ''}`}
							style={{
								maxHeight: isExpanded
									? `${fullHeight}px`
									: `${maxHeightDescription}px`,
							}}
						>
							<p className={styles.description__longAnswer_title}>
								Развёрнутый ответ:
							</p>
							<p className={styles.description__longAnswer_long}>
								{question?.longAnswer}
							</p>
						</div>
						{!isExpanded && isOverflowing && (
							<div className={styles.gradientMask} />
						)}
						{isOverflowing && (
							<button
								onClick={() => handleToggleOverflow()}
								className={styles.description__unwrap}
							>
								{isExpanded ? <span>Свернуть</span> : <span>Развернуть</span>}
								<div
									className={`${styles.up} ${isExpanded ? styles.rotated : ''}`}
								>
									<Icon name='arrowDown' />
								</div>
							</button>
						)}
					</div>
				</main>
				<div className={styles.sidebar}>
					<div className={styles.info}>
						<div className={styles.info__level}>
							<p>Уровень:</p>
							<div className={styles.info__level_lvl}>
								<div className={styles.complexity}>
									Cложность: <span>{question?.complexity}</span>
								</div>
								<div className={styles.rate}>
									Рейтинг: <span>{question?.rate}</span>
								</div>
							</div>
						</div>
						<div className={styles.info__skills}>
							<p>Навыки:</p>
							<div className={styles.info__skills_skill}>
								{question?.questionSkills.map(skill => (
									<button key={skill.id}>
										<Icon name='figma' />
										{skill.title}
									</button>
								))}
							</div>
						</div>
						<div className={styles.info__keywords}>
							<p>Ключевые слова</p>
							<div className={styles.info__keywords_keyword}>
								{question?.keywords.map((keyword, index) => (
									<span key={index}>#{keyword} </span>
								))}
							</div>
						</div>
						<div className={styles.info__author}>
							Автор:
							<span>
								{question?.createdBy === null
									? ''
									: question?.createdBy.username}
							</span>
						</div>
					</div>
					<div className={styles.contacts}>
						<div className={styles.contacts__wrapper}>
							<header>
								<Icon name='contacts' />
								<div className={styles.title}>
									<p className={styles.name}>Руслан Куянец</p>
									<p className={styles.spec}>Python Guru</p>
								</div>
							</header>
							<div className={styles.description}>
								<p>
									Guru – это эксперты YeaHub, которые помогают развивать
									комьюнити.
								</p>
							</div>
							<div className={styles.social}>
								<button>
									<Icon name='telegramPurple' />
								</button>
								<button>
									<Icon name='youtubePurple' />
								</button>
								<button className={styles.profile}>
									<span>
										<Icon name='profile' />
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionDetailPage;
