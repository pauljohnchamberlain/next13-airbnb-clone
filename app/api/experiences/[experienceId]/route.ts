import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
	accommodationId?: string | number;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { accommodationId } = params;

	if (!accommodationId || typeof accommodationId !== 'string') {
		throw new Error('Invalid ID');
	}

	// Convert accommodationId to a number
	const listingIdNumber = parseInt(accommodationId, 10);
	if (isNaN(listingIdNumber)) {
		throw new Error('Invalid ID');
	}

	const listing = await prisma.accommodation.deleteMany({
		where: {
			id: listingIdNumber,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}
