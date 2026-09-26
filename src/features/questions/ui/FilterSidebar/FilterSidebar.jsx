import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useDataQuestions } from '../../api/useDataQuestions';
import {
	useGetSkillsQuery,
	useGetSpecializationsQuery,
} from '../../api/questionsApi';
import useDebounced from '../../../../shared/lib/useDebounced';

import FilterGroup from './FilterGroup';
import SearchInput from '../SearchInput/SearchInput';

import styles from './FilterSidebar.module.scss';

const FilterSidebar = memo(({ modal }) => {
	const { filters, updateFilters } = useDataQuestions();
	const [search, setSearch] = useState(filters.search || '');
	const debouncedSearch = useDebounced(search, 450);

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

	const complexityItems = [
		{ id: '1-3', title: '1-3' },
		{ id: '4-6', title: '4-6' },
		{ id: '7-8', title: '7-8' },
		{ id: '9-10', title: '9-10' },
	];

	const ratingItems = [
		{ id: 1, title: '1' },
		{ id: 2, title: '2' },
		{ id: 3, title: '3' },
		{ id: 4, title: '4' },
		{ id: 5, title: '5' },
	];

	const statusItems = [
		{ id: 'Все', title: 'Все' },
		{ id: 'Изученные', title: 'Изученные' },
		{ id: 'Не изученные', title: 'Не изученные' },
	];

	const lastSyncedSearch = useRef(filters.search || '');

	useEffect(() => {
		lastSyncedSearch.current = filters.search || '';
		setSearch(filters.search || '');
	}, [filters.search]);

	useEffect(() => {
		if (debouncedSearch !== lastSyncedSearch.current) {
			lastSyncedSearch.current = debouncedSearch;
			updateFilters({ search: debouncedSearch.trim() });
		}
	}, [debouncedSearch, updateFilters]);

	const handleSearchChange = value => {
		setSearch(value);
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
				search: debouncedSearch,
			});
		},
		[filters, debouncedSearch, updateFilters],
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
				search: debouncedSearch,
			});
		},
		[filters, debouncedSearch, updateFilters],
	);

	const handleRatingToggle = useCallback(
		rate => {
			const current = Array.isArray(filters.rate) ? filters.rate : [];
			const newRating = current.includes(rate)
				? current.filter(r => r !== rate)
				: [...current, rate];

			updateFilters({
				...filters,
				rate: newRating,
				search: debouncedSearch,
			});
		},
		[filters, debouncedSearch, updateFilters],
	);

	const handleStatusChange = useCallback(
		newStatus => {
			updateFilters({
				...filters,
				status: newStatus,
				search: debouncedSearch,
			});
		},
		[filters, debouncedSearch, updateFilters],
	);

	if (specsLoad && skillsLoad) {
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
				<SearchInput onSearch={handleSearchChange} />
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
					items={complexityItems}
					selectedIds={
						Array.isArray(filters.complexity) ? filters.complexity : []
					}
					onToggle={handleComplexityToggle}
				/>

				<FilterGroup
					title='Рейтинг'
					items={ratingItems}
					selectedIds={Array.isArray(filters.rate) ? filters.rate : []}
					onToggle={handleRatingToggle}
				/>

				<FilterGroup
					title='Статус'
					items={statusItems}
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
