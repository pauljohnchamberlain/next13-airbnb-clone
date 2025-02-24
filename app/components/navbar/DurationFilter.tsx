'use client';

import { useCallback, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { set } from 'date-fns';
// import { useRouter } from 'next/router';

interface FilterBoxProps {
	label?: string;
	selected?: boolean;
}

interface QueryParams {
	duration?: string;
	// add other expected fields here
}

const DurationFilter: React.FC<FilterBoxProps> = ({ label, selected }) => {
	const router = useRouter();
	const params = useSearchParams();
	const duration = params.get('duration') || '';
	const currentDuration = duration.split(',');

	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const handleClick = useCallback(
		async (label: string) => {
			setIsLoading(true);
			try {
				let updatedDuration = duration === label ? '' : label; // Clear the duration if it matches the clicked label

				// Convert URLSearchParams to plain object
				const currentQuery: Record<string, string> = {};
				params.forEach((value, key) => {
					currentQuery[key] = value;
				});

				// Construct the updated query object without using 'delete'
				const updatedQuery = Object.fromEntries(
					Object.entries({
						...currentQuery,
						duration: updatedDuration,
					}).filter(([key, value]) => key !== 'duration' || value.length > 0)
				);

				const url = qs.stringifyUrl(
					{
						url: '/experiences',
						query: updatedQuery,
					},
					{ skipNull: true }
				);

				console.log('Constructed URL:', url);

				await router.push(url); // Using await here to wait for navigation to complete
			} catch (error) {
				// Handle error here, e.g., log it
				console.error('An error occurred:', error);
			} finally {
				// This will always run, regardless of whether an error was thrown
				setIsLoading(false);
			}
		},
		[router, params]
	);

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
									className={`relative inline-block w-full px-4 py-2 m-0 font-sans text-xs leading-4 text-center duration-150 bg-white border border-solid cursor-pointer hover:border-zinc-600 ${
										duration ? 'border-zinc-800' : 'border-zinc-300'
									} ${duration ? 'text-neutral-800' : 'text-neutral-500'} transition`}
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
								disabled={isLoading}
								checked={duration === label}
								onChange={() => handleClick(label)}
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
