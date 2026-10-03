import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import MockInterviewPageSkeleton from './MockInterviewPageSkeleton/MockInterviewPageSkeleton';

import { useGetQuizQuestionQuery } from '@/entities/quiz';
import { useGetSpecializationsQuery } from '@/entities/questions';
import { useGetSkillsQuery } from '@/entities/questions/api/skillsApi';
import { useFiltersQuiz } from '@/entities/quiz/model/useFiltersQuiz';

import { useSpecializationToggle } from '@/shared/lib/hooks/useSpecializationToggle';
import { useSkillsToggle } from '@/shared/lib/hooks/useSkillsToggle';
import { useComplexityToggle } from '@/shared/lib/hooks/useComplexityToggle';

import FilterButtons from './FilterButtons/FilterButtons';

import Icon from '@/shared/ui/Icon';

import styles from './MockInterviewPage.module.scss';

const COMPLEXITY_ITEMS = [
	{ id: '1-3', title: '1-3' },
	{ id: '4-6', title: '4-6' },
	{ id: '7-8', title: '7-8' },
	{ id: '9-10', title: '9-10' },
];

const MODE_ITEMS = [
	{ id: 'Повторение', title: 'Повторение' },
	{ id: 'Только новые', title: 'Только новые' },
	{ id: 'Случайные', title: 'Случайные' },
];

const MockInterviewPage = () => {
	const [count, setCount] = useState(1);
	const { filters, updateFiltersQuiz } = useFiltersQuiz();

	const {
		data: quiz,
		isLoading: loadQuiz,
		error: errorQuiz,
	} = useGetQuizQuestionQuery(filters);

	const {
		data: specs,
		isLoading: specsLoad,
		error: specsError,
	} = useGetSpecializationsQuery();

	const {
		data: skills,
		isLoading: skillsLoad,
		error: skillsError,
	} = useGetSkillsQuery();

	const toggleSpecialization = useSpecializationToggle(
		filters,
		updateFiltersQuiz,
	);
	const toggleSkills = useSkillsToggle(filters, updateFiltersQuiz);
	const toggleComplexity = useComplexityToggle(filters, updateFiltersQuiz);

	const handleModeChange = useCallback(
		newStatus => {
			updateFiltersQuiz({ mode: newStatus });
		},
		[updateFiltersQuiz],
	);
	const handleCount = value => {
		if ((count <= 1) & (value === -1) || (count >= 10) & (value === 1)) return;
		setCount(prev => prev + value);
	};

	if (specsLoad || skillsLoad) return <MockInterviewPageSkeleton />;
	if (specsError || skillsError) return <div>Ошибка загрузки</div>;

	return (
		<div className={styles.simulator}>
			<h2 className={styles.simulator_header}>Собеседование</h2>
			<div className={styles.simulator_split}>
				<div className={styles.quizFilter}>
					<FilterButtons
						title='Выбор специализации'
						items={specs?.data}
						selectedIds={
							Array.isArray(filters.specializationId)
								? filters.specializationId
								: []
						}
						onToggle={toggleSpecialization}
					/>
					<FilterButtons
						title='Категории вопросов'
						items={skills?.data}
						selectedIds={Array.isArray(filters.skills) ? filters.skills : []}
						onToggle={toggleSkills}
					/>
				</div>
				<div className={styles.category}>
					<FilterButtons
						title='Уровень сложности'
						items={COMPLEXITY_ITEMS}
						selectedIds={
							Array.isArray(filters.complexity) ? filters.complexity : []
						}
						onToggle={toggleComplexity}
					/>
					<FilterButtons
						title='Выберите режим'
						items={MODE_ITEMS}
						selectedIds={Array.isArray(filters.mode) ? filters.mode : []}
						onToggle={handleModeChange}
					/>
					<div className={styles.numberQuestions}>
						<h4 className={styles.numberQuestions_title}>
							Количество вопросов
						</h4>
						<div className={styles.numberQuestions_wrapper}>
							<button
								onClick={() => handleCount(-1)}
								className={styles.numberQuestions_btn}
							>
								<Icon name='minus' />
							</button>
							<div className={styles.numberQuestions_number}>{count}</div>
							<button
								onClick={() => handleCount(1)}
								className={styles.numberQuestions_btn}
							>
								<Icon name='plus' />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.start}>
				<Link
					to='/mock-interview/quiz'
					className={styles.start_link}
					state={{ quiz, loadQuiz, errorQuiz }}
				>
					<p>Начать</p>
					<Icon name='nextArrow' />
				</Link>
			</div>
		</div>
	);
};

export default MockInterviewPage;
