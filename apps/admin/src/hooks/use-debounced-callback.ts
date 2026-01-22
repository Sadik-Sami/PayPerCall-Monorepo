import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delayMs: number) {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef<number | null>(null);
	const lastArgsRef = useRef<Parameters<T> | null>(null);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const cancel = useCallback(() => {
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const flush = useCallback(() => {
		if (timeoutRef.current !== null && lastArgsRef.current) {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
			callbackRef.current(...lastArgsRef.current);
		}
	}, []);

	const debounced = useCallback(
		(...args: Parameters<T>) => {
			lastArgsRef.current = args;
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => {
				timeoutRef.current = null;
				if (lastArgsRef.current) {
					callbackRef.current(...lastArgsRef.current);
				}
			}, delayMs);
		},
		[delayMs]
	);

	useEffect(() => cancel, [cancel]);

	return { debounced, cancel, flush };
}

