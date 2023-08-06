import prisma from "@/app/libs/prismadb";

interface IParams {
	accommodationId?: string;
}

export default async function getListingById(params: IParams) {
	try {
		const { accommodationId } = params;

		console.log('Params', params);

		if (!accommodationId) {
			throw new Error('Accommodatiion ID is required');
		}

		// Parse the accommodationId to an integer
		const listingIdNumber = parseInt(accommodationId, 10);
		console.log('Listing ID Number', listingIdNumber);
		if (isNaN(listingIdNumber)) {
			throw new Error('Invalid Listing ID');
		}

		const listing = await prisma.accommodation.findUnique({
			where: {
				id: listingIdNumber,
			},
			include: {
				user: true,
			},
		});

		if (!listing) {
			return null;
		}

		return {
			...listing,
			createdAt: listing.createdAt.toString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toString(),
				updatedAt: listing.user.updatedAt.toString(),
				emailVerified: listing.user.emailVerified?.toString() || null,
			},
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
