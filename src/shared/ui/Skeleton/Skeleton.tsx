import styles from './Skeleton.module.scss';

const Skeleton = ({
	width = '100%',
	height = '1em',
	radius = '8px',
	className = '',
	style = {},
}) => {
	return (
		<div
			className={`${styles.skeleton} ${className}`}
			style={{ width, height, borderRadius: radius, ...style }}
		/>
	);
};

export default Skeleton;
