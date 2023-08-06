import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== 'string') {
		throw new Error('Invalid ID');
	}

	// Parse the accommodationId to an integer
	const reservationIdNumber = parseInt(reservationId, 10);
	if (isNaN(reservationIdNumber)) {
		throw new Error('Invalid Listing ID');
	}

	const reservation = await prisma.accommodationBooking.deleteMany({
		where: {
			id: reservationIdNumber,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
	});

	return NextResponse.json(reservation);
}
