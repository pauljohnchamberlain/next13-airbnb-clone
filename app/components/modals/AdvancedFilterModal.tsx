'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useAdvancedFilterModal from '@/app/hooks/useAdvancedFilterModal';

import Modal from './Modal';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Heading from '../Heading';
import tagCategories from '@/app/components/navbar/TagCategories';

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const AdvancedFilterModal = () => {
	const router = useRouter();
	const advancedFilterModal = useAdvancedFilterModal();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOCATION);

	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		[location]
	);

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			location: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		advancedFilterModal.onClose();
		router.push(url);
	}, [step, advancedFilterModal, location, router, guestCount, roomCount, dateRange, onNext, bathroomCount, params]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return 'Search';
		}

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}

		return 'Back';
	}, [step]);

	const timeOptions = [
		{ id: 'morning', label: 'Morning (Starts before 12pm)' },
		{ id: 'afternoon', label: 'Afternoon (Starts after 12pm)' },
		{ id: 'evening', label: 'Evening (Starts after 5pm)' },
	];

	let bodyContent = (
		<>
			<div className='max-h-[400px] overflow-y-auto'>
				<Heading title='Activity Type' subtitle='What do you want to do?' />
				{/* Parent div with flex styling */}
				<div className='flex flex-wrap'>
					{tagCategories.map((category, index) => (
						<div key={index} className='w-full py-2'>
							<div className='flex flex-row items-center gap-3'>
								<input
									type='checkbox'
									id={category.name}
									name={category.name}
									value={category.name}
									className='w-5 h-5 border-gray-300 rounded text-zinc-600 focus:ring-zinc-500'
								/>
								<label htmlFor={category.name} className='block text-sm font-medium text-gray-700'>
									{category.label}
								</label>
							</div>
							{category.children.map((child, childIndex) => (
								<div key={childIndex} className='py-2 pl-8'>
									{' '}
									{/* Double the indentation for children */}
									<div className='flex flex-row items-center gap-3'>
										<input
											type='checkbox'
											id={child.name}
											name={child.name}
											value={child.name}
											className='w-5 h-5 border-gray-300 rounded text-zinc-600 focus:ring-zinc-500'
										/>
										<label htmlFor={child.name} className='block text-sm font-medium text-gray-700'>
											{child.label}
										</label>
									</div>
									<div className='flex flex-wrap'>
										{child.children.map((grandchild, grandchildIndex) => (
											<div key={grandchildIndex} className='w-full py-2 pl-16 sm:w-1/2 lg:w-1/4'>
												{' '}
												{/* Set grandchildren into 4 columns on large displays and 2 columns on small */}
												<div className='flex flex-row items-center gap-3'>
													<input
														type='checkbox'
														id={grandchild.name}
														name={grandchild.name}
														value={grandchild.name}
														className='w-5 h-5 border-gray-300 rounded text-zinc-600 focus:ring-zinc-500'
													/>
													<label htmlFor={grandchild.name} className='block text-sm font-medium text-gray-700'>
														{grandchild.label}
													</label>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>

				<hr />
				<div>
					<Heading title='Price' subtitle='How much do you want to spend?' />
					<div className='flex gap-4'>
						<label htmlFor='min-price' className='block text-sm font-medium text-gray-700'>
							Min. price
							<input type='text' id='min-price' placeholder='min' className='w-full p-2 mt-1 border rounded-md' />
						</label>
						<label htmlFor='max-price' className='block text-sm font-medium text-gray-700'>
							Max. price
							<input type='text' id='max-price' placeholder='max' className='w-full p-2 mt-1 border rounded-md' />
						</label>
					</div>
				</div>

				<hr />
				<div>
					<Heading title='Time of Day' subtitle='What time of the day would like to start?' />
					<div>
						{timeOptions.map((option) => (
							<div key={option.id} className='py-2'>
								<input
									type='checkbox'
									id={option.id}
									className='w-5 h-5 border-gray-300 rounded text-zinc-600 focus:ring-zinc-500'
								/>
								<label htmlFor={option.id} className='pl-2 text-sm font-medium text-gray-700'>
									{option.label}
								</label>
							</div>
						))}
					</div>
				</div>
				<hr />
				<div>
					<Heading title='Duration' subtitle='How long do you want to go for?' />
					<ul className='p-0 m-0 not-italic leading-5 text-left align-baseline border-0 text-slate-800'>
						{['0-3 hours', '3-5 hours', '5-7 hours', 'Full day (7+ hours)', 'Multi-day'].map((label, index) => (
							<li
								key={index}
								className='flex flex-wrap items-center px-0 py-2 m-0 not-italic text-left align-baseline border-0 cursor-pointer lg:py-2 lg:pr-0 lg:pl-2'
							>
								<input
									type='checkbox'
									id={`x-${index}`}
									className='w-5 h-5 border-gray-300 rounded text-zinc-600 focus:ring-zinc-500'
									name='search-filter-durationRanges'
									style={{ listStyle: 'outside none none' }}
								/>
								<label
									htmlFor={`x-${index}`}
									className='flex-1 p-0 my-0 ml-2 mr-0 not-italic align-baseline border-0 lg:text-sm lg:font-normal lg:leading-5'
									style={{ listStyle: 'outside none none' }}
								>
									<span
										className='p-0 m-0 not-italic align-baseline border-0'
										style={{ listStyle: 'outside none none' }}
									>
										{label}
									</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			</div>
			{/* <Heading title='Where do you wanna go?' subtitle='Find the perfect location!' />
	<CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
	<hr />
	<Map center={location?.latlng} /> */}
		</>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='When do you plan to go?' subtitle='Make sure everyone is free!' />
				<Calendar onChange={(value) => setDateRange(value.selection)} value={dateRange} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='More information' subtitle='Find your perfect place!' />
				<Counter
					onChange={(value) => setGuestCount(value)}
					value={guestCount}
					title='Guests'
					subtitle='How many guests are coming?'
				/>
				<hr />
				<Counter
					onChange={(value) => setRoomCount(value)}
					value={roomCount}
					title='Rooms'
					subtitle='How many rooms do you need?'
				/>
				<hr />
				<Counter
					onChange={(value) => {
						setBathroomCount(value);
					}}
					value={bathroomCount}
					title='Bathrooms'
					subtitle='How many bathrooms do you need?'
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={advancedFilterModal.isOpen}
			title='Filters'
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			onClose={advancedFilterModal.onClose}
			body={bodyContent}
		/>
	);
};

export default AdvancedFilterModal;
