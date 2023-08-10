'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface FilterBoxProps {
	label: string;
	selected?: boolean;
}

interface QueryParams {
	tags?: string;
	// add other expected fields here
}

const FilterBox: React.FC<FilterBoxProps> = ({ label, selected }) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery: QueryParams = {};

		if (params) {
			currentQuery = qs.parse(params.toString()) as QueryParams;
		}

		let currentTags = currentQuery.tags ? currentQuery.tags.split(',') : [];

		if (currentTags.includes(label)) {
			currentTags = currentTags.filter((cat) => cat !== label);
		} else {
			currentTags.push(label);
		}

		const updatedQuery: any = {
			...currentQuery,
			tags: currentTags.join(','),
		};

		if (currentTags.length === 0) {
			delete updatedQuery.tags;
		}

		const url = qs.stringifyUrl(
			{
				url: '/experiences',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, router, params]);

	return (
		<div key={label} className='flex-grow'>
			<div className='flex-grow'>
				<div className='inline-block w-full py-1 pr-2 whitespace-nowrap'>
					<button
						onClick={handleClick}
						aria-label={label}
						className={`relative inline-block w-full px-4 py-2 m-0 font-sans text-xs leading-4 text-center duration-150 bg-white border border-solid cursor-pointer hover:border-zinc-600 ${
							selected ? 'border-zinc-800' : 'border-zinc-300'
						} ${selected ? 'text-neutral-800' : 'text-neutral-500'} transition`}
						role='checkbox'
						aria-checked='false'
						type='button'
						style={{
							outline: 'none',
							transitionProperty: '-ms-transform, -webkit-transform, transform, background-color, border-color',
							transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
							borderRadius: '30px',
						}}
					>
						<span className='text-sm font-normal'>
							<div className='flex place-content-center'>
								<span className='inline-block'>{label}</span>
							</div>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterBox;
