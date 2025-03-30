'use client';

import React from 'react';
import ContextMenu from '../ContextMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Address } from '@/lib/types/types';
import { useRouter } from 'next/navigation';
import { parseAddressId } from '@/lib/utils';

interface AddressItemContextMenuProps {
	address: Address;
}

const AddressItemContextMenu: React.FC<AddressItemContextMenuProps> = ({ address }) => {
	const router = useRouter();

	const handleEditClick = () => {
		router.push(
			`/${address.user_id}/edit/${parseAddressId(
				address.user_id,
				address.address_type,
				address.valid_from
			)}`
		);
	};

	const handleDeleteClick = () => {};

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

export default AddressItemContextMenu;
