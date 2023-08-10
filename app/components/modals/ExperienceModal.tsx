'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import useExperienceModal from '@/app/hooks/useExperienceModal';

import Modal from './Modal';
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import SuburbSelect, { SuburbSelectValue } from '../inputs/SuburbSelect';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import AdelaideMap from '../AdelaideMap';
import tagCategories from '../navbar/TagCategories';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const ExperienceModal = () => {
	const router = useRouter();
	const experienceModal = useExperienceModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

	const handleSuburbChange = (value?: SuburbSelectValue) => {
		const suburbName = value && Array.isArray(value.suburb) ? value.suburb[0] : null;
		setSelectedSuburb(suburbName);
		console.log(`Suburb name: ${suburbName}`);
		setCustomValue('location', value);
	};

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			tags: [],
			location: null,
			guestCount: 1,
			duration: 1,
			bathroomCount: 1,
			imageCover: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const location = watch('location');
	const tags = watch('tags');
	const guestCount = watch('guestCount');
	const duration = watch('duration');
	const bathroomCount = watch('bathroomCount');
	const imageCover = watch('imageCover');

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}

		setIsLoading(true);

		axios
			.post('/api/experiences', data)
			.then(() => {
				toast.success('Experience created!');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				experienceModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return 'Back';
	}, [step]);

	let bodyContent;

	if (step === STEPS.CATEGORY) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Which of these best describes your experience?' subtitle='Pick a category' />
				<div
					className='
			  grid 
			  grid-cols-1 
			  md:grid-cols-2 
			  gap-3
			  max-h-[50vh]
			  overflow-y-auto
			'
				>
					{tagCategories.map((item) => (
						<div key={item.label} className='col-span-1'>
							<CategoryInput
								onClick={(tag) => {
									const newTags = tags.includes(tag) ? tags.filter((t: string) => t !== tag) : [...tags, tag];
									setCustomValue('tags', newTags);
								}}
								selected={tags.includes(item.label)}
								label={item.label}
								icon={item.icon}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Where is your experience located?' subtitle='Help guests find you!' />
				<SuburbSelect value={location} onChange={handleSuburbChange} />
				<AdelaideMap suburb={selectedSuburb} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Share some details about your experience' subtitle='What can guests expect?' />
				<Counter
					onChange={(value) => setCustomValue('guestCount', value)}
					value={guestCount}
					title='Guests'
					subtitle='How many guests do you allow in one booking?'
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('duration', value)}
					value={duration}
					title='Duration'
					subtitle='What is the duration of your tour in hours?'
				/>
			</div>
		);
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Add a photo of your experience' subtitle='Show guests what they can expect!' />
				<ImageUpload onChange={(value) => setCustomValue('imageCover', value)} value={imageCover} />
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='How would you describe your tour?' subtitle='Short and sweet works best!' />
				<Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required />
				<hr />
				<Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
			</div>
		);
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Now, set your price per person' subtitle='How much do you charge per person?' />
				<Input
					id='price'
					label='Price'
					formatPrice
					type='number'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			disabled={isLoading}
			isOpen={experienceModal.isOpen}
			title='Airbnb your experience!'
			actionLabel={actionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onClose={experienceModal.onClose}
			body={bodyContent}
		/>
	);
};

export default ExperienceModal;
