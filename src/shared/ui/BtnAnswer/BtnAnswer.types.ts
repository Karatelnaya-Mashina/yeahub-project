import type { ComponentProps } from 'react';
import type Icon from '../Icon';

export type BtnAnswerName = NonNullable<ComponentProps<typeof Icon>['name']>;

export interface BtnAnswerProps {
	name: BtnAnswerName;
	p: string;
	active: boolean;
	onAnswer: () => void;
	className: string;
}
