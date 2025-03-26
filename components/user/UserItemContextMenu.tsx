'use client';

import React from 'react';
import ContextMenu from './ContextMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserItemContextMenuProps {}

const UserItemContextMenu: React.FC<UserItemContextMenuProps> = ({}) => {
	return (
		<>
			<ContextMenu
				className="!ml-auto"
				actions={[
					{
						actionTitle: 'Edit',
						actionIcon: <EditIcon fontSize="small" />,
						actionHandler: () => null
					},
					{
						actionTitle: 'Delete',
						actionIcon: <DeleteIcon fontSize="small" />,
						actionHandler: () => null
					}
				]}
			/>
		</>
	);
};

export default UserItemContextMenu;
