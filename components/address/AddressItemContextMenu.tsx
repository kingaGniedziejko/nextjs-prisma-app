'use client';

import React from 'react';
import ContextMenu from '../ContextMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEditAddressDialog from './AddEditAddressDialog';
import { Address } from '@/lib/types/types';
import { useDialog } from '@/lib/hooks/useDialog';

interface AddressItemContextMenuProps {
	address: Address;
}

const AddressItemContextMenu: React.FC<AddressItemContextMenuProps> = ({ address }) => {
	const [editDialogOpen, handleOpenEditDialog, handleCloseEditDialog] = useDialog();
	const handleDeleteAddress = () => {};

	return (
		<>
			<ContextMenu
				className="!ml-auto"
				actions={[
					{
						actionTitle: 'Edit',
						actionIcon: <EditIcon fontSize="small" />,
						actionHandler: handleOpenEditDialog
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
