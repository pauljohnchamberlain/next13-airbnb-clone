'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

const DurationFilter = ({}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	return (
		<>
			<div className='flex items-center'>
				<div className='flex-shrink-0 inline-block'>
					<div className='relative'>
						<div className=''>
							<div
								id='menuItemButton-experience_time_of_day'
								data-testid='menuItemButton-experience_time_of_day'
								className='inline-block py-1 pr-2 whitespace-nowrap'
							>
								<button
									className='relative inline-block w-full px-4 py-2 m-0 font-sans text-xs leading-4 text-center duration-150 bg-white border border-solid cursor-pointer border-zinc-300 hover:border-zinc-600'
									aria-expanded='false'
									type='button'
									style={{
										outline: 'none',
										transitionProperty: '-ms-transform, -webkit-transform, transform, background-color, border-color',
										transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
										borderRadius: '30px',
									}}
									onClick={toggleOpen}
								>
									<span className='text-sm font-normal'>
										<div className='flex place-content-center'>
											<span className='inline-block'>Duration</span>
											<span className='self-center ml-2'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 32 32'
													aria-hidden='true'
													role='presentation'
													focusable='false'
													style={{
														display: 'block',
														fill: 'none',
														height: '12px',
														width: '12px',
														stroke: 'currentcolor',
														strokeWidth: '5.33333px',
														overflow: 'visible',
													}}
													className='block w-3 h-3 overflow-visible'
												>
													<path fill='none' d='M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12' className=''></path>
												</svg>
											</span>
										</div>
									</span>
									<span
										className='absolute w-px h-px p-0 border-0 overflow-clip'
										style={{ clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(100%)' }}
									>
										No filter applied
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='inline w-0 h-5 ml-2 mr-4 border-l border-solid border-zinc-300 hover:border-zinc-600'></div>
			</div>
			{isOpen && (
				<div
					className='absolute left-0 z-10 p-6 m-0 not-italic leading-5 text-left align-baseline bg-white border border-solid whitespace-nowrap rounded-2xl border-zinc-200 text-slate-800'
					data-test-id='exposed-filters-dropdown-content-durationRanges'
					style={{
						top: '100%',
						left: '330px',
						zIndex: 2001,
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
						maxWidth: '848px',
					}}
				>
					{['0-3 hours', '3-5 hours', '5-7 hours', 'Full day (7+ hours)', 'Multi-day'].map((label, index) => (
						<li
							key={index}
							className='flex items-center p-2 m-0 not-italic text-left align-baseline border-0 cursor-pointer lg:py-2 lg:pr-0 lg:pl-2'
							style={{ flexWrap: 'unset', listStyle: 'outside none none' }}
						>
							<input
								type='checkbox'
								id={`x-${index}`}
								className='font-sans text-sm text-black cursor-default'
								name='search-filter-durationRanges'
								data-test-id={`search-filters-item-input-trigger-durationRanges-${index}`}
								style={{ listStyle: 'outside none none' }}
							/>
							<label
								htmlFor={`x-${index}`}
								className='flex-1 p-0 my-0 ml-2 mr-0 not-italic align-baseline border-0 lg:text-base lg:font-normal lg:leading-5'
								style={{ listStyle: 'outside none none' }}
							>
								<span className='p-0 m-0 not-italic align-baseline border-0' style={{ listStyle: 'outside none none' }}>
									{label}
								</span>
							</label>
						</li>
					))}
				</div>
			)}
		</>
	);
};

export default DurationFilter;
