// import { tagCategories } from '@/app/components/navbar/tagCategories';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	console.log(body);
	const { title, description, imageCover, tags, location, price } = body;

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	// Extract suburb and postcode from the location object
	const suburb = location?.suburb?.[0] ?? '';
	const postcode = location?.postcode?.[0] ?? '';

	// Concatenate suburb and postcode into a single string
	const locationString = `${suburb} - ${postcode}`;

	const slugBase = title
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
	const uniqueSlug = `${slugBase}-${currentUser.id}`;

	const listing = await prisma.experience.create({
		data: {
			title,
			description,
			imageCover,
			tags,
			location: locationString,
			price: parseInt(price, 10),
			userId: currentUser.id,
			slug: uniqueSlug, // Replace with appropriate value
			summary: 'some-summary-value', // Replace with appropriate value
			cancellationPolicy: 'some-cancellation-policy-value', // Replace with appropriate value
			ratingsCount: 0, // Replace with appropriate value
		},
	});

	return NextResponse.json(listing);
}
