'use client';

import React from 'react';
import ContextMenu from '../ContextMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEditAddressDialog from './AddEditAddressDialog';
import { Address } from '@/lib/types/types';
import { useDialog } from '@/lib/hooks/useDialog';
import { useRouter } from 'next/navigation';
import { parseAddressId } from '@/lib/utils';

interface AddressItemContextMenuProps {
	address: Address;
}

const AddressItemContextMenu: React.FC<AddressItemContextMenuProps> = ({ address }) => {
	const [editDialogOpen, handleOpenEditDialog, handleCloseEditDialog] = useDialog();
	const handleDeleteAddress = () => {};

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
						actionHandler: handleDeleteAddress
					}
				]}
			/>
			<AddEditAddressDialog
				open={editDialogOpen}
				handleClose={handleCloseEditDialog}
				isEdit
				userId={address.user_id}
				addressToEdit={address}
			/>
		</>
	);
};

export default AddressItemContextMenu;
