import prisma from "@/app/libs/prismadb";

interface IParams {
	accommodationId?: number;
	userId?: number;
	authorId?: number;
}

export default async function getReservations(params: IParams) {
	try {
		const { accommodationId, userId, authorId } = params;

		const query: any = {};

		if (accommodationId !== undefined) {
			const accommodationIdNumber = parseInt(accommodationId.toString(), 10);

			// Check if the parsed value is a valid number
			if (isNaN(accommodationIdNumber)) {
				throw new Error('Invalid Accommodation ID');
			}

			query.accommodationId = accommodationIdNumber;
		}

		if (userId) {
			query.userId = userId;
		}

		if (authorId) {
			query.listing = { userId: authorId };
		}

		const reservations = await prisma.accommodationBooking.findMany({
			where: query,
			include: {
				accommodation: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeReservations = reservations.map((reservation) => ({
			...reservation,
			createdAt: reservation.createdAt.toISOString(),
			startDate: reservation.startDate.toISOString(),
			endDate: reservation.endDate.toISOString(),
			listing: {
				...reservation.accommodation,
				createdAt: reservation.accommodation.createdAt.toISOString(),
			},
		}));

		return safeReservations;
	} catch (error: any) {
		throw new Error(error);
	}
}
