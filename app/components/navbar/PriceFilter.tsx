'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

const PriceFilter = ({}) => {
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
								id='menuItemButton-price_range'
								data-testid='menuItemButton-price_range'
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
											<span className='inline-block'>Price</span>
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
										Filter not applied
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					role='presentation'
					className='absolute left-0 visible inline-block overflow-hidden text-base leading-5 whitespace-normal bg-white border-0 border-solid rounded-xl border-zinc-300 text-neutral-800'
					style={{
						top: '100%',
						left: '100px',
						zIndex: 2001,
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
						maxWidth: '848px',
					}}
				>
					<div className='overflow-auto leading-5' style={{ maxHeight: '420px', maxWidth: '848px' }}>
						<div className='p-5 text-neutral-800' style={{ maxHeight: '512px', overflow: 'hidden auto' }}>
							<div className=''>
								<div className=''>
									<div className=''>
										<div className='pt-2'>
											<div className='pb-10 font-normal text-neutral-500'>
												The average price of an experience is $269&nbsp;AUD.
											</div>
											<div dir='ltr' className=''>
												<div className='w-11/12 m-auto'>
													<div className=''>
														<div className='relative overflow-visible'>
															<div className='relative top-0 w-full h-px rounded-sm bg-zinc-300'></div>
															<div className='absolute w-full h-4' style={{ top: '-2px', left: '-2px', bottom: '4px' }}>
																<div
																	className='absolute px-2 -ml-4'
																	style={{ left: '0%', position: 'absolute', zIndex: 2, top: '-12px' }}
																>
																	<button
																		className='relative inline-block w-8 h-8 px-2 py-1 m-0 text-sm text-center text-black border border-solid cursor-pointer border-zinc-400'
																		type='button'
																		aria-valuenow='1'
																		aria-valuetext='$1 AUD'
																		aria-label='Minimum Price'
																		role='slider'
																		aria-valuemax='150'
																		aria-valuemin='1'
																		aria-disabled='false'
																		tabIndex='0'
																		style={{
																			textDecoration: 'none',
																			outline: 'none',
																			transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1) 0s',
																			borderRadius: '50%',
																		}}
																	>
																		<span
																			className='grid w-full h-full grid-flow-col gap-px place-content-center'
																			style={{ gridTemplateColumns: 'repeat(3, 1px)' }}
																		>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																		</span>
																	</button>
																</div>
																<div
																	className='absolute px-2 -ml-4 left-full'
																	style={{ left: '100%', position: 'absolute', zIndex: 2, top: '-12px' }}
																>
																	<button
																		className='relative inline-block w-8 h-8 px-2 py-1 m-0 text-sm text-center text-black border border-solid cursor-pointer border-zinc-400'
																		type='button'
																		aria-valuenow='150'
																		aria-valuetext='$150 AUD'
																		aria-label='Maximum Price'
																		role='slider'
																		aria-valuemax='150'
																		aria-valuemin='1'
																		aria-disabled='false'
																		tabIndex='0'
																		style={{
																			textDecoration: 'none',
																			outline: 'none',
																			transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1) 0s',
																			borderRadius: '50%',
																		}}
																	>
																		<span
																			className='grid w-full h-full grid-flow-col gap-px place-content-center'
																			style={{ gridTemplateColumns: 'repeat(3, 1px)' }}
																		>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																			<div className='w-px h-2 md:h-3 bg-zinc-400'></div>
																		</span>
																	</button>
																</div>
															</div>
															<div
																className='absolute top-0 w-full h-px rounded-sm bg-zinc-400'
																style={{ left: '0%', width: '100%' }}
															></div>
														</div>
													</div>
													<div className='flex items-center justify-center mt-8 md:mt-8'>
														<div
															className='relative flex w-full m-0 font-sans font-normal rounded-lg cursor-text'
															style={{ minHeight: '56px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}
														>
															<label className='relative flex-1 p-0 cursor-default' htmlFor='price_filter_min'>
																<div
																	className='absolute w-48 p-0 m-0 pointer-events-none text-neutral-500'
																	style={{
																		top: '18px',
																		transformOrigin: '0% 0%',
																		transition: 'transform 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s',
																		left: '12px',
																		right: '12px',
																		transform: 'translateY(-8px) scale(0.75)',
																	}}
																>
																	<div className='max-w-full truncate'>min price</div>
																</div>
																<div dir='ltr' className=''>
																	<div className='flex opacity-100'>
																		<div className='pt-6 pl-3 -mr-2'>
																			<span className=''>$</span>
																		</div>
																		<input
																			className='w-full p-0 mx-3 mt-6 mb-1 bg-transparent appearance-none'
																			id='price_filter_min'
																			autoComplete='off'
																			type='text'
																			aria-describedby=''
																			value='1'
																			style={{ fontSize: '128%', outline: 'none' }}
																		/>
																	</div>
																</div>
															</label>
														</div>
														<div className='m-2' tabIndex='-1'>
															–
														</div>
														<div
															className='relative flex w-full m-0 font-sans font-normal rounded-lg cursor-text'
															style={{ minHeight: '56px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}
														>
															<label className='relative flex-1 p-0 cursor-default' htmlFor='price_filter_max'>
																<div
																	className='absolute w-48 p-0 m-0 pointer-events-none text-neutral-500'
																	style={{
																		top: '18px',
																		transformOrigin: '0% 0%',
																		transition: 'transform 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s',
																		left: '12px',
																		right: '12px',
																		transform: 'translateY(-8px) scale(0.75)',
																	}}
																>
																	<div className='max-w-full truncate'>max price</div>
																</div>
																<div dir='ltr' className=''>
																	<div className='flex opacity-100'>
																		<div className='pt-6 pl-3 -mr-2'>
																			<span className=''>$</span>
																		</div>
																		<input
																			className='w-full p-0 mx-3 mt-6 mb-1 bg-transparent appearance-none'
																			id='price_filter_max'
																			autoComplete='off'
																			type='text'
																			aria-describedby=''
																			value='150+'
																			style={{ fontSize: '128%', outline: 'none' }}
																		/>
																	</div>
																</div>
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='p-3 border-t border-gray-200 border-solid'>
						<div className='flex items-center justify-between text-neutral-800'>
							<button
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

export default PriceFilter;
