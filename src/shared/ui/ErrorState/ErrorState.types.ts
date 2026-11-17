import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export interface ErrorInterface {
	data: {
		error: string;
		message: string;
		statusCode: number;
	};
	status: number;
}

export interface ErrorParams {
	title: string;
	message?: string;
	error?: FetchBaseQueryError | SerializedError;
	onRetry?: () => void;
	retryLabel?: string;
	onReset?: () => void;
	resetLabel?: string;
	className?: string;
}
