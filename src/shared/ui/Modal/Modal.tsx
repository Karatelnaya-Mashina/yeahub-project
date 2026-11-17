import { useEffect, type MouseEvent } from 'react';

import styles from './Modal.module.scss';
import type { ModalProps } from './Modal.types';

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
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
