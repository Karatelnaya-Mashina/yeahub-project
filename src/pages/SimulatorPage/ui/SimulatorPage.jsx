import { useCallback, useState } from 'react';
import {
	useGetSkillsQuery,
	useGetSpecializationsQuery,
} from '@/entities/questions';
import { useGetQuizQuestionQuery } from '@/entities/quiz';

import { useQuestions } from '@/entities/questions/model/useQuestions';

import { FilterGroup } from '@/widgets/FilterSidebar';
import Icon from '@/shared/ui/Icon';

import styles from './SimulatorPage.module.scss';

const SimulatorPage = () => {
	const { filters, updateFilters } = useQuestions();

	const {
		data: quiz,
		isLoading: loadQuiz,
		error: errorQuiz,
	} = useGetQuizQuestionQuery();

	const {
		data: specs,
		isLoading: loadingSpecs,
		error: errorSpecs,
	} = useGetSpecializationsQuery();
	const {
		data: skills,
		isLoading: loadSkills,
		error: errorSkills,
	} = useGetSkillsQuery();
	const [count, setCount] = useState(1);

	const complexity = [
		{ id: '1-3', title: '1-3' },
		{ id: '4-6', title: '4-6' },
		{ id: '7-8', title: '7-8' },
		{ id: '9-10', title: '9-10' },
	];

	const status = [
		{ id: 'Повторение', title: 'Повторение' },
		{ id: 'Только новые', title: 'Только новые' },
		{ id: 'Случайные', title: 'Случайные' },
	];

	const handleCount = value => {
		if ((count <= 1) & (value === -1)) return;
		setCount(prev => prev + value);
	};
	const handleSpecializationToggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.specializationId)
				? filters.specializationId
				: [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFilters({
				...filters,
				specializationId: newIds,
			});
		},
		[filters, updateFilters],
	);

	const handleSkillToggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.skills) ? filters.skills : [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFilters({ skills: newIds });
		},
		[filters.skills, updateFilters],
	);

	const handleComplexityToggle = useCallback(
		range => {
			const current = Array.isArray(filters.complexity)
				? filters.complexity
				: [];
			const newRanges = current.includes(range)
				? current.filter(r => r !== range)
				: [...current, range];

			updateFilters({
				...filters,
				complexity: newRanges,
			});
		},
		[filters, updateFilters],
	);

	return (
		<div className={styles.simulator}>
			<h2 className={styles.simulator_header}>Собеседование</h2>
			<div className={styles.simulator_split}>
				<div className={styles.quizFilter}>
					<div className={styles.specializations}>
						<FilterGroup
							title='Выбор специализации'
							items={specs?.data}
							selectedIds={
								Array.isArray(filters.specializationId)
									? filters.specializationId
									: []
							}
							onToggle={handleSpecializationToggle}
						/>
					</div>
					<div className={styles.skills}>
						<FilterGroup
							title='Категории вопросов'
							items={skills?.data}
							selectedIds={Array.isArray(filters.skills) ? filters.skills : []}
							onToggle={handleSkillToggle}
						/>
					</div>
				</div>
				<div className={styles.category}>
					<div className={styles.complexity}>
						<FilterGroup
							title='Уровень сложности'
							items={complexity}
							selectedIds={
								Array.isArray(filters.complexity) ? filters.complexity : []
							}
							onToggle={handleComplexityToggle}
						/>
					</div>
					<div className={styles.mode}>
						<FilterGroup title='Выберите режим' items={status} />
					</div>
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
				<button className={styles.start_btn}>
					<p>Начать</p>
					<Icon name='nextArrow' />
				</button>
			</div>
		</div>
	);
};

export default SimulatorPage;
