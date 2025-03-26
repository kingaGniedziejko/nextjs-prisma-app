'use client';
import React from 'react';

export const useDialog = (): [boolean, () => void, () => void] => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return [open, handleOpen, handleClose];
};
