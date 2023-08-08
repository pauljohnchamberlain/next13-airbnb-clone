import prisma from '@/app/libs/prismadb';

export type SafeExperienceBooking = {
	id: number;
	userId: number;
	experienceId: number;
	startDate: string; // Or Date, depending on how you're handling dates
	endDate: string; // Or Date
	totalPrice: number;
	createdAt: string; // Or Date
};

interface IParams {
	experienceId?: number;
	userId?: number;
	authorId?: number;
}

export default async function getExperienceBookings(params: IParams): Promise<SafeExperienceBooking[]> {
	try {
		const { experienceId, userId, authorId } = params;

		const query: any = {};

		if (experienceId !== undefined) {
			const experienceIdNumber = parseInt(experienceId.toString(), 10);

			// Check if the parsed value is a valid number
			if (isNaN(experienceIdNumber)) {
				throw new Error('Invalid Experience ID');
			}

			query.experienceId = experienceIdNumber;
		}

		if (userId) {
			query.userId = userId;
		}

		if (authorId) {
			query.experience = { userId: authorId };
		}

		const bookings = await prisma.experienceBooking.findMany({
			where: query,
			include: {
				experience: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeBookings = bookings.map((booking) => ({
			id: booking.id,
			userId: booking.userId,
			experienceId: booking.experienceId,
			startDate: booking.startDate.toISOString(),
			endDate: booking.endDate.toISOString(),
			totalPrice: booking.totalPrice,
			createdAt: booking.createdAt.toISOString(),
		}));

		return safeBookings;
	} catch (error: any) {
		throw new Error(error);
	}
}
