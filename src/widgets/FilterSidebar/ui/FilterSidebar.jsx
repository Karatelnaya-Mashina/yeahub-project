import { useCallback, memo } from 'react';
import { useQuestions } from '@/entities/questions/model/useQuestions';
import {
	useGetSkillsQuery,
	useGetSpecializationsQuery,
} from '@/entities/questions';

import FilterGroup from './FilterGroup';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';

import styles from './FilterSidebar.module.scss';

const COMPLEXITY_ITEMS = [
	{ id: '1-3', title: '1-3' },
	{ id: '4-6', title: '4-6' },
	{ id: '7-8', title: '7-8' },
	{ id: '9-10', title: '9-10' },
];

const RATING_ITEMS = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

const STATUS_ITEMS = [
	{ id: 'Все', title: 'Все' },
	{ id: 'Изученные', title: 'Изученные' },
	{ id: 'Не изученные', title: 'Не изученные' },
];

const FilterSidebar = memo(({ modal }) => {
	const { filters, updateFilters } = useQuestions();

	const {
		data: specsData,
		isLoading: specsLoad,
		error: specsError,
	} = useGetSpecializationsQuery();

	const {
		data: skillsData,
		isLoading: skillsLoad,
		error: skillsError,
	} = useGetSkillsQuery();

	const skills = skillsData?.data;

	// const lastSyncedSearch = useRef(filters.search || '');

	// useEffect(() => {
	// 	lastSyncedSearch.current = filters.search || '';
	// 	setSearch(filters.search || '');
	// }, [filters.search]);

	// useEffect(() => {
	// 	if (debouncedSearch !== lastSyncedSearch.current) {
	// 		lastSyncedSearch.current = debouncedSearch;
	// 		updateFilters({ search: debouncedSearch.trim() });
	// 	}
	// }, [debouncedSearch, updateFilters]);

	const updateFiltersWithSearch = useCallback(
		patch => {
			updateFilters({
				...filters,
				...patch,
			});
		},
		[filters, updateFilters],
	);

	const handleSearchChange = useCallback(
		value => {
			updateFilters({ ...filters, search: value });
		},
		[filters, updateFilters],
	);

	const handleSpecializationToggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.specializationId)
				? filters.specializationId
				: [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFiltersWithSearch({ specializationId: newIds });
		},
		[filters.specializationId, updateFiltersWithSearch],
	);

	const handleSkillToggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.skills) ? filters.skills : [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFiltersWithSearch({ skills: newIds });
		},
		[filters.skills, updateFiltersWithSearch],
	);

	const handleComplexityToggle = useCallback(
		range => {
			const current = Array.isArray(filters.complexity)
				? filters.complexity
				: [];
			const newRanges = current.includes(range)
				? current.filter(r => r !== range)
				: [...current, range];

			updateFiltersWithSearch({ complexity: newRanges });
		},
		[filters.complexity, updateFiltersWithSearch],
	);

	const handleRatingToggle = useCallback(
		rate => {
			const current = Array.isArray(filters.rate) ? filters.rate : [];
			const newRating = current.includes(rate)
				? current.filter(r => r !== rate)
				: [...current, rate];

			updateFiltersWithSearch({ rate: newRating });
		},
		[filters.rate, updateFiltersWithSearch],
	);

	const handleStatusChange = useCallback(
		newStatus => {
			updateFiltersWithSearch({ status: newStatus });
		},
		[filters.status, updateFiltersWithSearch],
	);

	if (specsLoad || skillsLoad) {
		return (
			<div className={styles.loading}>
				<div className={styles.spinner}></div>
				<p>Загрузка...</p>
			</div>
		);
	}

	if (specsError || skillsError) {
		return (
			<div className={styles.errorQuestions}>
				{specsError && (
					<div>
						Ошибка загрузки специализации: {specsError?.message}. Статус:{' '}
						{specsError.statusCode}
					</div>
				)}
				{skillsError && (
					<div>
						Ошибка загрузки навыков: {skillsError?.message}. Статус:{' '}
						{skillsError.statusCode}
					</div>
				)}
			</div>
		);
	}

	return (
		<aside
			className={`${styles.sidebar} ${styles.modal} ${modal && styles.modal_active} `}
		>
			<header className={styles.sidebarHeader}>
				<SearchInput
					onSearch={handleSearchChange}
					initialValue={filters.search}
				/>
			</header>

			<main>
				<FilterGroup
					title='Специализации'
					items={specsData?.data}
					selectedIds={
						Array.isArray(filters.specializationId)
							? filters.specializationId
							: []
					}
					onToggle={handleSpecializationToggle}
				/>

				<FilterGroup
					title='Навыки'
					items={skills}
					selectedIds={Array.isArray(filters.skills) ? filters.skills : []}
					onToggle={handleSkillToggle}
				/>

				<FilterGroup
					title='Уровень сложности'
					items={COMPLEXITY_ITEMS}
					selectedIds={
						Array.isArray(filters.complexity) ? filters.complexity : []
					}
					onToggle={handleComplexityToggle}
				/>

				<FilterGroup
					title='Рейтинг'
					items={RATING_ITEMS}
					selectedIds={Array.isArray(filters.rate) ? filters.rate : []}
					onToggle={handleRatingToggle}
				/>

				<FilterGroup
					title='Статус'
					items={STATUS_ITEMS}
					selectedId={filters.status || 'Все'}
					onChange={handleStatusChange}
					isSingleSelect={true}
					showAllButton={false}
				/>
			</main>
		</aside>
	);
});

export default FilterSidebar;
