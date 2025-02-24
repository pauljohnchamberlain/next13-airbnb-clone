'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedFilterModal from '../modals/AdvancedFilterModal';
import useAdvancedFilterModal from '@/app/hooks/useAdvancedFilterModal';

const AdvancedFilter = () => {
	const router = useRouter();
	const advancedFilterModal = useAdvancedFilterModal();

	return (
		<>
			<div className='flex py-1'>
				<button
					aria-label='Filters'
					className='relative inline-block px-4 py-2 m-0 font-sans text-xs leading-4 text-center duration-150 bg-white border border-solid cursor-pointer border-zinc-300 hover:border-zinc-600'
					aria-expanded='false'
					type='button'
					style={{
						outline: 'none',
						transitionProperty: '-ms-transform, -webkit-transform, transform, background-color, border-color',
						transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
						borderRadius: '30px',
					}}
					onClick={advancedFilterModal.onOpen}
				>
					<div className='flex whitespace-nowrap'>
						<div className='mt-px'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 16 16'
								aria-hidden='true'
								role='presentation'
								focusable='false'
								style={{
									display: 'block',
									height: '16px',
									width: '16px',
									fill: 'currentColor',
								}}
								className='block w-4 h-4'
							>
								<path
									d='M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
									className=''
								></path>
							</svg>
						</div>
						<span className='hidden ml-1 text-sm'>Filters</span>
					</div>
				</button>
			</div>
			{advancedFilterModal.isOpen && <AdvancedFilterModal />}
		</>
	);
};

export default AdvancedFilter;
