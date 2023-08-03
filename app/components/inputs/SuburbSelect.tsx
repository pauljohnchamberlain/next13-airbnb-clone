'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';

import adelaideSuburbs from '@/vendor/suburbs.json';
import { sub } from 'date-fns';

export type SuburbSelectValue = {
	id: number;
	postcode: Array<string>;
	suburb: Array<string>;
};

interface SuburbSelectProps {
	value?: SuburbSelectValue;
	onChange: (value?: SuburbSelectValue) => void;
}

const SuburbSelect: React.FC<SuburbSelectProps> = ({ value, onChange }) => {
	const [suburbs, setSuburbs] = useState<{ value: SuburbSelectValue; label: string }[]>([]);

	useEffect(() => {
		const suburbsData = adelaideSuburbs.records.map((suburb: (string | number)[]) => ({
			value: { id: suburb[0] as number, postcode: [suburb[1] as string], suburb: [suburb[2] as string] },
			label: `${suburb[2]} - ${suburb[1]}`,
		}));

		setSuburbs(suburbsData);
	}, []);

	const selectedValue = value ? suburbs.find((suburb) => suburb.value.id === value.id) || null : null;

	return (
		<div>
			<Select
				placeholder='Anywhere in Greater Adelaide Region'
				isClearable
				options={suburbs}
				value={selectedValue}
				onChange={(select) => {
					console.log('Selected value:', select);
					onChange(select?.value);
				}}
				formatOptionLabel={(option: any) => (
					<div className='flex flex-row items-center gap-3 '>
						<div>{option.flag}</div>
						<div>
							{option.label}
							<span className='ml-1 text-neutral-500'>{option.region}</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#ffe4e6',
					},
				})}
			/>
		</div>
	);
};

export default SuburbSelect;
