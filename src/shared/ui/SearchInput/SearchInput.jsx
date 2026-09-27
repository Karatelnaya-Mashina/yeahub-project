import { useState, useEffect, memo, useMemo } from 'react';
import debounce from 'lodash.debounce';

import Icon from '@/shared/ui/Icon';

import styles from './SearchInput.module.scss';

const SearchInput = memo(({ onSearch, initialValue = '' }) => {
	const [query, setQuery] = useState(initialValue);

	const debouncedSearch = useMemo(
		() => debounce(value => onSearch?.(value), 450),
		[onSearch],
	);

	useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

	const handleChange = e => {
		const value = e.target.value;
		setQuery(value);
		debouncedSearch(value);
	};

	return (
		<form className={styles.searchForm} onSubmit={e => e.preventDefault()}>
			<span className={styles.searchSvg}>
				<Icon name='search' className={styles.searchIcon} />
			</span>

			<input
				className={styles.searchInput}
				type='text'
				placeholder='Введите запрос…'
				value={query}
				onChange={handleChange}
			/>
		</form>
	);
});

export default SearchInput;
