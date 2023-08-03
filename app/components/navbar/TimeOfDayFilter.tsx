'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

const TimeOfDayFilter = ({}) => {
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
											<span className='inline-block'>Time of Day</span>
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
			</div>
			{isOpen && (
				<div
					className='absolute left-0 visible inline-block overflow-hidden text-base leading-5 whitespace-normal bg-white border-0 border-solid rounded-xl border-zinc-300 text-neutral-800'
					style={{
						top: '100%',
						left: '200px',
						zIndex: 2001,
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
						maxWidth: '848px',
					}}
				>
					{['Morning', 'Afternoon', 'Evening'].map((timeOfDay, index) => (
						<div key={index} className=''>
							<div className='p-5'>
								<div
									id={`filterItem-experience_time_of_day-checkbox-experience_time_of_day-${timeOfDay.toLowerCase()}`}
									className='py-0 rounded-none'
								>
									<label
										className='cursor-pointer'
										htmlFor={`filterItem-experience_time_of_day-checkbox-experience_time_of_day-${timeOfDay.toLowerCase()}-row-checkbox`}
									>
										<div className='flex flex-wrap gap-4'>
											<div className='flex'>
												<span className='relative inline-block p-0'>
													<input
														name={timeOfDay}
														id={`filterItem-experience_time_of_day-checkbox-experience_time_of_day-${timeOfDay.toLowerCase()}-row-checkbox`}
														className='absolute w-px h-px p-0 m-0 text-black border-0 opacity-0 cursor-default whitespace-nowrap overflow-clip'
														type='checkbox'
														style={{ fontSize: '128%', clipPath: 'unset', outline: 'none' }}
													/>
													<span className='c1dz1hqo dir dir-ltr' data-checkbox='true'></span>
												</span>
											</div>
											<div className='flex flex-col justify-center flex-auto w-full'>
												<div
													id={`filterItem-experience_time_of_day-checkbox-experience_time_of_day-${timeOfDay.toLowerCase()}-row-title`}
													className='font-sans'
												>
													{timeOfDay}
												</div>
												<div
													className='mt-1 font-sans text-sm leading-4 text-neutral-500'
													id={`filterItem-experience_time_of_day-checkbox-experience_time_of_day-${timeOfDay.toLowerCase()}-row-subtitle`}
													style={{ wordBreak: 'break-word' }}
												>
													{timeOfDay === 'Morning' && 'Starts before 12 pm'}
													{timeOfDay === 'Afternoon' && 'Starts after 12 pm'}
													{timeOfDay === 'Evening' && 'Starts after 5 pm'}
												</div>
											</div>
										</div>
									</label>
								</div>
							</div>
						</div>
					))}
					<div className='p-3 leading-5 border-t border-gray-200 border-solid'>
						<div className='flex items-center justify-between text-neutral-800'>
							<button
								data-testid='filter-panel-clear-button'
								disabled={false}
								type='button'
								className='relative inline-block w-auto p-2 my-0 -mx-3 font-sans font-semibold text-center bg-transparent rounded-lg opacity-100 cursor-not-allowed text-zinc-300 hover:bg-transparent'
								style={{
									textDecoration: 'underline',
									outline: 'none',
									transition: 'none 0s ease 0s',
									contain: 'paint',
								}}
							>
								Clear
							</button>
							<div className='ml-auto'>
								<button
									id='filter-panel-save-button'
									data-testid='filter-panel-save-button'
									type='button'
									className='relative inline-block w-auto px-4 py-2 m-0 font-sans text-sm font-semibold leading-4 text-center text-white rounded-lg cursor-pointer bg-neutral-300'
									style={{ textDecoration: 'none', outline: 'none', transition: 'none 0s ease 0s' }}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TimeOfDayFilter;
