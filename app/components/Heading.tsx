'use client';

interface HeadingProps {
	title: string;
	summary?: string;
	location?: string;
	center?: boolean;
	subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, summary, location, subtitle, center }) => {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<div className='text-2xl font-bold'>{title}</div>
			<div className='font-light text-neutral-500 mt-2'>{location || subtitle}</div>
			<div className='font-light text-neutral-500 mt-2'>{summary}</div>
		</div>
	);
};
 
export default Heading;