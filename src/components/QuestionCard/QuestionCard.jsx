import { useState, memo } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../assets/icons/Icon';
import styles from './QuestionCard.module.scss';

const QuestionCard = memo(({ question, questions }) => {
	const [isReveal, setIsReveal] = useState(false);

	const handleRevealAnswer = () => {
		setIsReveal(prev => !prev);
	};

	return (
		<div className={styles.card}>
			<div className={styles.question}>
				<button
					onClick={handleRevealAnswer}
					className={styles.btn}
					aria-expanded={isReveal}
				>
					<p className={styles.titleQuestions}>{question.title}</p>

					<div
						className={`${styles.arrowWrapper} ${isReveal ? styles.rotated : ''}`}
					>
						<Icon name='arrowWrapper' />
					</div>
				</button>
			</div>

			<div
				className={`${styles.answerContainer} ${isReveal ? styles.expanded : ''}`}
			>
				<div className={styles.info}>
					<div className={styles.infoBlock}>
						<ul className={styles.infoList}>
							<li className={styles.rating}>
								<p>
									Рейтинг: <span>{question.rate}</span>
								</p>
							</li>
							<li className={styles.complexity}>
								<p>
									Сложность: <span>{question.complexity}</span>
								</p>
							</li>
						</ul>

						{question.imageSrc && (
							<div className={styles.code}>
								<img src={question.imageSrc} alt='Иллюстрация' />
							</div>
						)}

						<div className={styles.additionalFunction}>
							<button className={styles.additionalFunction__btn}>
								<Icon name='btnAdditionalFunction' />
							</button>
						</div>
					</div>

					<div className={styles.answer}>
						<p className={styles.description}>{question.description}</p>
					</div>
					<div className={styles.detail}>
						<Link
							to={`/${question.id}`}
							className={styles.detail}
							state={{ questions }}
						>
							Подробнее
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
});

export default QuestionCard;
