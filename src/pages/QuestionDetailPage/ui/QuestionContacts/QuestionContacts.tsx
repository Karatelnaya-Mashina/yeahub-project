import Icon from '@/shared/ui/Icon';
import contactsAva from '@/shared/assets/images/contactsAva.webp';
import styles from './QuestionContacts.module.scss';

const QuestionContacts = () => {
	return (
		<div className={styles.contacts}>
			<div className={styles.contacts__wrapper}>
				<header>
					<img src={contactsAva} alt='contacts' width={45} height={45} />
					<div className={styles.title}>
						<p className={styles.name}>Руслан Куянец</p>
						<p className={styles.spec}>Python Guru</p>
					</div>
				</header>
				<div className={styles.description}>
					<p>
						Guru – это эксперты YeaHub, которые помогают развивать комьюнити.
					</p>
				</div>
				<div className={styles.social}>
					<button>
						<Icon name='telegramPurple' />
					</button>
					<button>
						<Icon name='youtubePurple' />
					</button>
					<button className={styles.profile}>
						<span>
							<Icon name='profile' />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuestionContacts;
