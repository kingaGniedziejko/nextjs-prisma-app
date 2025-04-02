'use client';

import React from 'react';
import ContextMenu from '../ContextMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePathname, useRouter } from 'next/navigation';
import { removeUser } from '@/actions/userActions';

interface UserItemContextMenuProps {
	userId: number;
}

const UserItemContextMenu: React.FC<UserItemContextMenuProps> = ({ userId }) => {
	const router = useRouter();

	const handleEditClick = () => {
		router.push(`/edit/${userId}`);
	};

	const handleDeleteClick = () => {
		removeUser(userId);
	};

	return (
		<>
			<ContextMenu
				className="!ml-auto"
				actions={[
					{
						actionTitle: 'Edit',
						actionIcon: <EditIcon fontSize="small" />,
						actionHandler: handleEditClick
					},
					{
						actionTitle: 'Delete',
						actionIcon: <DeleteIcon fontSize="small" />,
						actionHandler: handleDeleteClick
					}
				]}
			/>
		</>
	);
};

export default UserItemContextMenu;
