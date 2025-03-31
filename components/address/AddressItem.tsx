import { Address } from '@/lib/types/Address.type';
import React from 'react';
import { Card } from '@mui/material';
import AddressItemContextMenu from './AddressItemContextMenu';
import AddressDisplay from './AddressDisplay';
import PlaceIcon from '@mui/icons-material/Place';
import dayjs from 'dayjs';
import { dateFormat } from '@/lib/const';

interface AddressItemProps {
	address: Address;
	className?: string;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, className }) => {
	return (
		<>
			<Card variant="outlined" className={`${className} flex flex-row it space-x-4 p-4`}>
				<PlaceIcon className="mt-1" />
				<div className="flex flex-col sm:flex-row">
					<AddressDisplay address={address} className="mr-20" />
					<div className="mt-2 sm:mt-[3px]">
						<p className="text-xs font-semibold">{address.address_type}</p>
						<p className="text-xs">Valid from: {dayjs(address.valid_from).format(dateFormat)}</p>
					</div>
				</div>
				<AddressItemContextMenu address={address} />
			</Card>
		</>
	);
};

export default AddressItem;
