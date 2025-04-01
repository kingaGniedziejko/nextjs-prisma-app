'use client';

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ContextMenuProps {
	className?: string;
	actions: { actionTitle: string; actionIcon: React.ReactNode; actionHandler: () => void }[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ className, actions }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className={className}>
			<IconButton aria-label="options" onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{actions.map((action, index) => (
					<MenuItem
						key={index}
						onClick={() => {
							handleClose();
							action.actionHandler();
						}}
					>
						{action.actionIcon && <ListItemIcon>{action.actionIcon}</ListItemIcon>}
						<ListItemText>{action.actionTitle}</ListItemText>
					</MenuItem>
				))}
			</Menu>{' '}
		</div>
	);
};

export default ContextMenu;
