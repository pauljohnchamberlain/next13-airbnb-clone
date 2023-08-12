import prisma from "@/app/libs/prismadb";

interface IParams {
	accommodationId?: number;
}

export default async function getListingById(params: IParams) {
	try {
		const { accommodationId } = params;

		if (!accommodationId) {
			throw new Error('Accommodatiion ID is required');
		}

		const listingIdNumber = parseInt(accommodationId.toString(), 10);

		// Check if the parsed value is a valid number
		if (isNaN(listingIdNumber)) {
			throw new Error('Invalid Accommodation ID');
		}

		console.log('Params', params);

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
