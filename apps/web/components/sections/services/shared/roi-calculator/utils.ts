
export const compactCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

export const preciseCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const integerNumber = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});

export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

export function smoothstep(t: number) {
	return t * t * (3 - 2 * t);
}

export function roundMoney(value: number) {
	return Number.isFinite(value) ? Math.round(value) : 0;
}
