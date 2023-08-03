// AdelaideMap.tsx

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Geocode from 'react-geocode';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapUpdater from './MapUpdater';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
});

interface MapProps {
	suburb?: string | null;
}

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Replace with your actual Geocoding API key
Geocode.setApiKey('AIzaSyCUQxmF1Z_ccOD7d7Ehn_nOVdspdQNqEUQ');

Geocode.setLanguage('en');
Geocode.setRegion('au');
Geocode.setLocationType('ROOFTOP');
Geocode.enableDebug();

const AdelaideMap: React.FC<MapProps> = ({ suburb }) => {
	const [center, setCenter] = useState<L.LatLngTuple | null>(null);

	useEffect(() => {
		if (suburb) {
			const fullAddress = `${suburb}, South Australia, Australia`;

			Geocode.fromAddress(fullAddress).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					console.log(lat, lng);
					setCenter([lat, lng] as [number, number]); // Cast as tuple
				},
				(error) => {
					console.error(error);
				}
			);
		} else {
			setCenter(null);
		}
	}, [suburb]);

	return (
		<MapContainer
			center={(center as L.LatLngExpression) || [51, -0.09]}
			zoom={center ? 18 : 2} // Increase zoom level when center is defined
			scrollWheelZoom={false}
			className='h-[35vh] rounded-lg'
		>
			<TileLayer url={url} attribution={attribution} />
			{center && <Marker position={center as L.LatLngExpression} />}
			<MapUpdater center={center} />
		</MapContainer>
	);
};

export default AdelaideMap;
