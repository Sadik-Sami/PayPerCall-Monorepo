import localFont from 'next/font/local';
import { Geist } from 'next/font/google';

export const googleSansFlex = localFont({
	src: [
		{
			path: '../public/fonts/google-sans-flex-100.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-200.woff2',
			weight: '200',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-300.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-500.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-600.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-700.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-800.woff2',
			weight: '800',
			style: 'normal',
		},
		{
			path: '../public/fonts/google-sans-flex-900.woff2',
			weight: '900',
			style: 'normal',
		},
	],
	variable: '--font-body',
	display: 'swap',
});

export const gesistSans = Geist({
	subsets: ['latin'],
	variable: '--font-heading',
	display: 'swap',
});

export const arialFont = localFont({
	src: [
		{
			path: '../public/fonts/ArialRegular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/fonts/ArialBold.woff',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../public/fonts/ArialItalic.woff',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../public/fonts/ArialBoldItalic.woff',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--font-utility',
	display: 'swap',
	fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
});
