'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
	title: string;
	location: string;
	imageCover: string;
	id: string;
	currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, location, imageCover, id, currentUser }) => {
	console.log('Title:', title);
	console.log('Location Value:', location);
	console.log('Image Cover:', imageCover);
	console.log('ID:', id);
	console.log('Current User:', currentUser);

	const { getByValue } = useCountries();

	const locationData = getByValue(location);

	console.log('getByValue :>> ', getByValue(location));
	console.log('location', location);
	console.log('location:', location);

	return (
		<>
			<Heading title={title} subtitle={`${locationData?.region}, ${locationData?.label}`} />
			<div
				className='
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        '
			>
				<Image src={imageCover} fill className='object-cover w-full' alt='Image' />
				<div
					className='
            absolute
            top-5
            right-5
          '
				>
					<HeartButton accommodationId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};
 
export default ListingHead;