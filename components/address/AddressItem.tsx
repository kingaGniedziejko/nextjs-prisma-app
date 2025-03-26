import { Address } from '@/lib/types/types';
import React from 'react';
import { Card } from '@mui/material';
import AddressItemContextMenu from './AddressItemContextMenu';
import AddressDisplay from './AddressDisplay';

interface AddressItemProps {
	address: Address;
	className?: string;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, className }) => {
	return (
		<>
			<Card variant="outlined" className={`${className} flex flex-row it space-x-4 p-4`}>
				<AddressDisplay address={address} />
				<AddressItemContextMenu address={address} />
			</Card>
		</>
	);
};

export default AddressItem;
