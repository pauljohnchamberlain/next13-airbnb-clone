import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    accommodationId,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!accommodationId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.accommodation.update({
		where: {
			id: accommodationId,
		},
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					startDate,
					endDate,
					totalPrice,
				},
			},
		},
	});

  return NextResponse.json(listingAndReservation);
}
