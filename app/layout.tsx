import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col p-5 md:p-10 space-y-5 h-[100vh] w-[100vw]">{children}</div>
			</body>
		</html>
	);
}
