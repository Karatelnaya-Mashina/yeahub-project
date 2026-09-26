import Icon from '../../shared/assets/icons/Icon';
import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.logo}>
				<Icon name='logo' />
			</div>
			<p className={styles.choice}>
				Выбери, каким будет IT завтра, вместе с нами
			</p>
			<p className={styles.project}>
				YeaHub — это полностью открытый проект, призванный объединить и улучшить
				IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн
				проекта также открыт для ознакомления в Figma.
			</p>
			<p className={styles.line}></p>
			<div className={styles.info}>
				<div className={styles.info_documents}>
					<p>© 2024 YeaHub</p>
					<p>Документы</p>
				</div>
				<div className={styles.info_social}>
					<p>Ищите нас и в других соцсетях @yeahub_it</p>
					<a href=''>
						<Icon name='figma' />
					</a>
					<a href=''>
						<Icon name='telegram' />
					</a>
					<a href=''>
						<Icon name='youtube' />
					</a>
					<a href=''>
						<Icon name='tik-tok' />
					</a>
					<a href=''>
						<Icon name='github' />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
