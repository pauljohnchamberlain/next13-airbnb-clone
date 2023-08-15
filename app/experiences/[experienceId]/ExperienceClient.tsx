'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeExperience, SafeExperienceBooking, SafeUser } from '@/app/types';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import Container from '@/app/components/Container';
import ExperienceHead from '@/app/components/experiences/ExperienceHead';
import ExperienceInfo from '@/app/components/experiences/ExperienceInfo';
import ExperienceBooking from '@/app/components/experiences/ExperienceBooking';
import tagCategories from '@/app/components/navbar/TagCategories';

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

const ExperienceClient: React.FC<{
	experience: SafeExperience & {
		user: SafeUser;
	};
	experienceBookings?: SafeExperienceBooking[];
	currentUser?: SafeUser | null;
}> = ({ experience, experienceBookings = [], currentUser }) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		experienceBookings.forEach((experienceBooking: any) => {
			const range = eachDayOfInterval({
				start: new Date(experienceBooking.startDate),
				end: new Date(experienceBooking.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [experienceBookings]);

	const category = useMemo(() => {
		return tagCategories.find((items) => experience.tags.includes(items.label));
	}, [experience.tags]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(experience.price ?? 0);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateExperienceBooking = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		axios
			.post('/api/experience-bookings', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: experience?.id,
			})
			.then(() => {
				toast.success('Listing reserved!');
				setDateRange(initialDateRange);
				router.push('/trips');
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [totalPrice, dateRange, experience?.id, router, currentUser, loginModal]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

			if (dayCount && experience.price) {
				setTotalPrice(dayCount * experience.price ?? 0);
			} else {
				setTotalPrice(experience.price ?? 0);
			}
		}
	}, [dateRange, experience.price]);

	return (
		<Container>
			<div className='max-w-screen-lg mx-auto'>
				<div className='flex flex-col gap-6'>
					<ExperienceHead
						id={experience.id}
						title={experience.title}
						imageCover={experience.imageCover}
						location={experience.location}
						summary={experience.summary ? experience.summary : undefined}
					/>
					<div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
						<ExperienceInfo
							user={experience.user}
							description={experience.description}
							category={experience.tags}
							location={experience.location}
							duration={experience.duration || 0}
						/>
						<div className='order-first mb-10 md:order-last md:col-span-3'>
							<ExperienceBooking
								price={experience.price || 0}
								duration={experience.duration || 1}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateExperienceBooking}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ExperienceClient;
