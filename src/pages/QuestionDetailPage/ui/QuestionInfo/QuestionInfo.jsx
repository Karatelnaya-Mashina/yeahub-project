import Icon from '@/shared/ui/Icon';
import styles from './QuestionInfo.module.scss';

const QuestionInfo = ({ complexity, rate, skills, keywords, createdBy }) => {
	return (
		<div className={styles.info}>
			<div className={styles.info__level}>
				<p>Уровень:</p>
				<div className={styles.info__level_lvl}>
					<div className={styles.complexity}>
						Cложность: <span>{complexity}</span>
					</div>
					<div className={styles.rate}>
						Рейтинг: <span>{rate}</span>
					</div>
				</div>
			</div>
			<div className={styles.info__skills}>
				<p>Навыки:</p>
				<div className={styles.info__skills_skill}>
					{skills.map(skill => (
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
					{keywords.map((keyword, index) => (
						<span key={index}>#{keyword} </span>
					))}
				</div>
			</div>
			<div className={styles.info__author}>
				Автор:
				<span>{createdBy === null ? '' : createdBy.username}</span>
			</div>
		</div>
	);
};

export default QuestionInfo;
