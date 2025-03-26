'use client';

import { Pagination } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface ListPaginationProps {
	totalPages: number;
	currentPage: number;
	className?: string;
}

const ListPagination: React.FC<ListPaginationProps> = ({ totalPages, currentPage, className }) => {
	const pathname = usePathname();
	const { replace } = useRouter();

	const createPageURL = (pageNumber: number) => {
		const params = new URLSearchParams();
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		replace(createPageURL(page));
	};

	return (
		<Pagination
			className={className}
			page={currentPage}
			count={totalPages}
			onChange={handleChange}
		/>
	);
};

export default ListPagination;
