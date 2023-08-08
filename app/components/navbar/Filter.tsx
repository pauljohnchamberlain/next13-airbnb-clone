'use client';

import React from 'react';
import Container from '../Container';

import { usePathname, useSearchParams } from 'next/navigation';

import FilterBox from '../FilterBox';
import PriceFilter from './PriceFilter';
import TimeOfDayFilter from './TimeOfDayFilter';
import DurationFilter from './DurationFilter';
import AdvancedFilter from './AdvancedFilter';
import tagCategories from '@/app/components/navbar/TagCategories';

function Filter() {
	const params = useSearchParams();
	const selectedCategories = params?.get('category')?.split(',') || [];
	const pathname = usePathname();
	// const isMainPage = pathname === '/';

	// if (!isMainPage) {
	// 	return null;
	// }

	return (
		<Container>
			<div
				className='text-base leading-5 text-neutral-800'
				role='group'
				id='filter-menu-chip-group'
				aria-labelledby='filter-menu-chip-group-DLS-chipGroup-label'
			>
				<div className='leading-5' id='filter-menu-chip-group-DLS-chipGroup-label'>
					<span
						className='absolute w-px h-px p-0 border-0 whitespace-nowrap overflow-clip'
						style={{ clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(100%)' }}
					>
						Filters
					</span>
				</div>
				<div className='inset-x-0 z-10 px-6 py-3 leading-5'>
					<div className='flex items-center text-neutral-800'>
						<PriceFilter />
						<TimeOfDayFilter />
						<DurationFilter />

						<div className='flex items-center'>
							<div className='flex'>
								<div className='flex h-12 overflow-hidden' style={{ flexFlow: 'wrap' }}>
									{tagCategories.map((item) => (
										<FilterBox key={item.label} label={item.label} selected={selectedCategories.includes(item.label)} />
									))}
								</div>
							</div>
						</div>
						<AdvancedFilter />
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Filter;
