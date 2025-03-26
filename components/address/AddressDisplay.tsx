import { AddressShort } from '@/lib/types/types';
import React from 'react';

interface AddressDisplayProps {
	address: AddressShort;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
	return (
		<div>
			<p className="text-lg font-semibold mb-[-3px]">{`${address.street} ${address.building_number}`}</p>
			<p>{`${address.post_code} ${address.city}`}</p>
			<p>{address.country_code}</p>
		</div>
	);
};

export default AddressDisplay;
