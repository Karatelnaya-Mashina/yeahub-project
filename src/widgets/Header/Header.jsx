import { Link, NavLink } from 'react-router-dom';

import Icon from '../../shared/assets/icons/Icon';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Link to='/'>
					<div className={styles.logo}>
						<Icon name='logo' />
						<Icon
							name='logoText'
							className={`${styles.logo_text} ${styles.logo_text_none}`}
						/>
					</div>
				</Link>

				<div className={styles.list}>
					<ul className={styles.list_desktop}>
						<NavLink to='/questions' className={styles.link}>
							База вопросов
						</NavLink>
						<NavLink to='/simulator' className={styles.link}>
							Тренажер
						</NavLink>
						<NavLink className={styles.link}>Материалы</NavLink>
					</ul>
					<div className={styles.list_tablet}>
						<button className={styles.preparation}>
							<p>Подготовка</p>
							<Icon name='arrowDown' />
						</button>
					</div>
				</div>
			</div>
			<div className={styles.auth}>
				<div className={styles.auth_desktop}>
					<button className={styles.entrance}>Вход</button>
					<button className={styles.registration}>Регистрация</button>
				</div>

				<div className={styles.auth_tablet}>
					<span className={styles.line}></span>
					<span className={styles.line}></span>
					<span className={styles.line}></span>
				</div>
			</div>
		</header>
	);
};

export default Header;
