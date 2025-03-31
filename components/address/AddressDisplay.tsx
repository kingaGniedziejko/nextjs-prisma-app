import { AddressShort } from '@/lib/types/Address.type';
import React from 'react';

interface AddressDisplayProps {
	className?: string;
	address: AddressShort;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address, className }) => {
	return (
		<div>
			<p
				className={`${className} text-md font-semibold mb-[-3px]`}
			>{`${address.street} ${address.building_number}`}</p>
			<p className="text-sm">{`${address.post_code} ${address.city}`}</p>
			<p className="text-xs">{address.country_code}</p>
		</div>
	);
};

export default AddressDisplay;
