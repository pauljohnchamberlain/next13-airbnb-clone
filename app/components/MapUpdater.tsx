import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface MapUpdaterProps {
	center: L.LatLngExpression | null;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
	const map = useMap();

	useEffect(() => {
		if (center) {
			map.flyTo(center, 14); // Or map.setView(center, 4) if you don't want an animated transition
		}
	}, [center, map]);

	return null;
};

export default MapUpdater;
