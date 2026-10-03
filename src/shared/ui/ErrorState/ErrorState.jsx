import Icon from '@/shared/ui/Icon';
import styles from './ErrorState.module.scss';

const ErrorState = ({
	title = 'Что-то пошло не так',
	message,
	error,
	onRetry,
	retryLabel = 'Попробовать снова',
	onReset,
	resetLabel = 'Сбросить фильтры',
	className = '',
}) => {
	const errorText = message || error?.message;

	const statusCode = error?.status || error?.statusCode;

	return (
		<div className={`${styles.error} ${className}`}>
			<div className={styles.error__icon}>
				<Icon name='error' />
			</div>

			<h3 className={styles.error__title}>{title}</h3>

			{errorText && <p className={styles.error__message}>{errorText}</p>}

			{statusCode && (
				<p className={styles.error__status}>Код ошибки: {statusCode}</p>
			)}

			<div className={styles.error__actions}>
				{onRetry && (
					<button className={styles.error__btn} onClick={onRetry}>
						{retryLabel}
					</button>
				)}
				{onReset && (
					<button
						className={`${styles.error__btn} ${styles.error__btn_ghost}`}
						onClick={onReset}
					>
						{resetLabel}
					</button>
				)}
			</div>
		</div>
	);
};

export default ErrorState;
