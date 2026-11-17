import Skeleton from '@/shared/ui/Skeleton/Skeleton';
import styles from './QuestionDetailPageSkeleton.module.scss';

const QuestionDetailPageSkeleton = () => {
	return (
		<div className={styles.detail}>
			<div className={styles.prev}>
				<Skeleton width='1em' height='1em' radius='4px' />
				<Skeleton width='3.5em' height='1em' />
			</div>

			<div className={styles.container}>
				<main className={styles.main}>
					<header className={styles.header}>
						<Skeleton width='10em' height='10em' radius='12px' />
						<div className={styles.header_heading}>
							<Skeleton width='70%' height='1.5em' />
							<Skeleton width='50%' height='1em' />
						</div>
					</header>

					<div className={styles.navigation}>
						<Skeleton width='9em' height='2.5em' radius='12px' />
						<Skeleton width='5em' height='1em' />
						<Skeleton width='9em' height='2.5em' radius='12px' />
					</div>

					<div className={styles.answer}>
						<Skeleton width='40%' height='1.25em' />
						<Skeleton width='100%' height='1em' />
						<Skeleton width='90%' height='1em' />
						<Skeleton width='95%' height='1em' />
						<Skeleton width='70%' height='1em' />
					</div>
				</main>

				<div className={styles.sidebar}>
					<div className={styles.info}>
						<Skeleton width='30%' height='1em' />
						<div className={styles.info_row}>
							<Skeleton width='6em' height='2.5em' radius='12px' />
							<Skeleton width='6em' height='2.5em' radius='12px' />
						</div>

						<Skeleton width='30%' height='1em' />
						<div className={styles.info_row}>
							<Skeleton width='5em' height='2em' radius='8px' />
							<Skeleton width='5em' height='2em' radius='8px' />
							<Skeleton width='5em' height='2em' radius='8px' />
						</div>

						<Skeleton width='40%' height='1em' />
						<Skeleton width='100%' height='1em' />
						<Skeleton width='80%' height='1em' />

						<Skeleton width='50%' height='1em' />
					</div>

					<div className={styles.contacts}>
						<div className={styles.contacts_header}>
							<Skeleton width='2.5em' height='2.5em' radius='50%' />
							<div className={styles.contacts_names}>
								<Skeleton width='8em' height='1em' />
								<Skeleton width='5em' height='0.875em' />
							</div>
						</div>
						<Skeleton width='100%' height='1em' />
						<Skeleton width='85%' height='1em' />
						<div className={styles.contacts_social}>
							<Skeleton width='2.5em' height='2.5em' radius='50%' />
							<Skeleton width='2.5em' height='2.5em' radius='50%' />
							<Skeleton width='2.5em' height='2.5em' radius='50%' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionDetailPageSkeleton;
