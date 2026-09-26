import { useEffect } from 'react';

import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleEsc = e => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
		}

		return () => document.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={styles.modal}>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default Modal;
