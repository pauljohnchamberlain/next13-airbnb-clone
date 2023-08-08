export const dynamic = 'force-dynamic';
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';

import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';

interface ListingsProps {
	searchParams: IListingsParams;
}

const Listings = async ({ searchParams }: ListingsProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<Container>
				<div
					className='
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          '
				>
					{listings.map((experience: any) => (
						<ListingCard currentUser={currentUser} key={experience.id} data={experience} />
					))}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Listings;
