import { useCallback, memo } from 'react';
import { useFiltersItems } from '@/entities/questions';

import FilterSidebarSkeleton from './FilterSidebarSkeleton/FilterSidebarSkeleton';

import {
	useGetSkillsQuery,
	useGetSpecializationsQuery,
} from '@/entities/questions';

import { useArrayToggle } from '@/shared/lib/hooks/useArrayToggle';

import FilterGroup from './FilterGroup';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

import type { FilterProps, StatusItem } from './filters.types';
import type { ErrorInterface } from '@/shared/ui/ErrorState/ErrorState.types';

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

const STATUS_ITEMS: StatusItem[] = [
	{ id: 'Все', title: 'Все' },
	{ id: 'Изученные', title: 'Изученные' },
	{ id: 'Не изученные', title: 'Не изученные' },
];

const FilterSidebar = memo(({ modal = false }: FilterProps) => {
	const { filters, updateFilters } = useFiltersItems();

	const {
		data: specsData,
		isLoading: specsLoad,
		error: specsError,
		refetch: refetchSpecs,
	} = useGetSpecializationsQuery();

	const {
		data: skillsData,
		isLoading: skillsLoad,
		error: skillsError,
		refetch: refetchSkills,
	} = useGetSkillsQuery();

	const toggleSpecialization = useArrayToggle<number>(
		filters.specializationId,
		newSpec => updateFilters({ specializationId: newSpec }),
	);
	const toggleSkills = useArrayToggle<number | string>(
		filters.skills,
		newSkills => updateFilters({ skills: newSkills }),
	);
	const toggleComplexity = useArrayToggle<string>(
		filters.complexity,
		newRanges => updateFilters({ complexity: newRanges }),
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			updateFilters({ search: value });
		},
		[updateFilters],
	);

	const handleRatingToggle = useCallback(
		(rate: number) => {
			const current = Array.isArray(filters.rate) ? filters.rate : [];
			const newRating = current.includes(rate)
				? current.filter((r: number) => r !== rate)
				: [...current, rate];

			updateFilters({ rate: newRating });
		},
		[filters.rate, updateFilters],
	);

	const handleStatusChange = useCallback(
		(newStatus: 'Все' | 'Изученные' | 'Не изученные') => {
			updateFilters({ status: newStatus });
		},
		[updateFilters],
	);

	if (specsLoad || skillsLoad) return <FilterSidebarSkeleton />;

	if (specsError || skillsError) {
		return (
			<>
				<ErrorState
					title='Не удалось загрузить фильтры'
					error={((specsError ?? skillsError) as ErrorInterface) || undefined}
					onRetry={() => {
						refetchSpecs();
						refetchSkills();
					}}
				/>
			</>
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
					onToggle={toggleSpecialization}
				/>

				<FilterGroup
					title='Навыки'
					items={skillsData?.data}
					selectedIds={Array.isArray(filters.skills) ? filters.skills : []}
					onToggle={toggleSkills}
				/>

				<FilterGroup
					title='Уровень сложности'
					items={COMPLEXITY_ITEMS}
					selectedIds={
						Array.isArray(filters.complexity) ? filters.complexity : []
					}
					onToggle={toggleComplexity}
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
