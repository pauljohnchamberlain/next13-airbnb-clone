'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';

import Modal from './Modal';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
// import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import AdelaideMap from '../AdelaideMap';
import SuburbSelect, { SuburbSelectValue } from '../inputs/SuburbSelect';
import Heading from '../Heading';

enum STEPS {
	LOCATION = 0,
	// DATE = 1,
	INFO = 1,
}

const SearchModal = () => {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOCATION);

	const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);
	// const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [duration, setDuration] = useState(1);
	// const [bathroomCount, setBathroomCount] = useState(1);
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

	const handleSuburbChange = (value?: SuburbSelectValue) => {
		const suburbName = value ? value.suburb[0] : null;
		setSelectedSuburb(suburbName);
		console.log('selectedSuburb :>> ', selectedSuburb);
		console.log('value :>> ', value);
		// setCustomValue('location', value);
		// setSelectedSuburb(value || null);
	};

	// const setCustomValue = (id: string, value: any) => {
	// 	setValue(id, value, {
	// 		shouldDirty: true,
	// 		shouldTouch: true,
	// 		shouldValidate: true,
	// 	});
	// };

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
			suburb: selectedSuburb,
			guestCount,
			duration,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: '/experiences',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [step, searchModal, location, router, guestCount, duration, dateRange, onNext, params]);

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

	console.log('selectedSuburb :>> ', selectedSuburb);

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading title='Where do you wanna go?' subtitle='Find the perfect location!' />
			<SuburbSelect value={selectedSuburb} onChange={handleSuburbChange} />
			<AdelaideMap suburb={selectedSuburb} />
			{/* <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} /> */}
			<hr />
			{/* <Map center={location?.latlng} /> */}
		</div>
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
					onChange={(value) => setDuration(value)}
					value={duration}
					title='Duration'
					subtitle='What is the duration of your experience in hours?'
				/>
				<hr />
				{/* <Counter
					onChange={(value) => {
						setBathroomCount(value);
					}}
					value={bathroomCount}
					title='Bathrooms'
					subtitle='How many bathrooms do you need?'
				/> */}
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title='Filters'
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			onClose={searchModal.onClose}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
