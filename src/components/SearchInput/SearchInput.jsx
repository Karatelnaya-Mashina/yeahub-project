import { useState, useEffect, useCallback, memo } from 'react';
import useDebounced from '../../hooks/useDebounced';

import styles from './SearchInput.module.scss';
import Icon from '../../assets/icons/Icon';

const SearchInput = memo(({ onSearch }) => {
	const [query, setQuery] = useState('');

	const debouncedQuery = useDebounced(query, 450);

	const handleSearch = useCallback(
		value => {
			onSearch?.(value);
		},
		[onSearch],
	);

	useEffect(() => {
		if (debouncedQuery !== undefined) {
			handleSearch(debouncedQuery);
		}
	}, [debouncedQuery, handleSearch]);

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
				onChange={e => setQuery(e.target.value)}
			/>
		</form>
	);
});

export default SearchInput;
