import { useEffect } from 'react';

import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children, className }) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = e => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) onClose();
	};
	return (
		<div
			className={`${styles.modal} ${className} `}
			onClick={handleOverlayClick}
		>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default Modal;
