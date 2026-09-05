import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default leaflet marker icon issues in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Car SVG Icon for Drivers
const carIcon = L.divIcon({
    className: 'driver-marker-icon',
    html: `<div style="background: #111; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2px solid #fff;">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <rect x="3" y="11" width="18" height="8" rx="2"></rect>
               <path d="M7 11V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4"></path>
               <circle cx="7.5" cy="15.5" r="1.5" fill="#fff"></circle>
               <circle cx="16.5" cy="15.5" r="1.5" fill="#fff"></circle>
             </svg>
           </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
});

const pickupIcon = L.divIcon({
    className: 'pickup-marker-icon',
    html: `<div style="background: #10b981; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(16,185,129,0.7); border: 3px solid #fff;">
             <div style="background: #fff; width: 8px; height: 8px; border-radius: 50%;"></div>
           </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});

const dropoffIcon = L.divIcon({
    className: 'dropoff-marker-icon',
    html: `<div style="background: #ef4444; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(239,68,68,0.7); border: 3px solid #fff;">
             <div style="background: #fff; width: 8px; height: 8px; border-radius: 2px;"></div>
           </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});

const LiveMap = ({ pickupCoords, destCoords, driverCoords, showNearbyDrivers = true }) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const pickupMarkerRef = useRef(null);
    const dropoffMarkerRef = useRef(null);
    const driverMarkerRef = useRef(null);
    const routeLineRef = useRef(null);
    const nearbyDriversRef = useRef([]);

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const defaultLat = 20.2961;
        const defaultLng = 85.8245;

        const map = L.map(mapContainerRef.current, {
            center: [defaultLat, defaultLng],
            zoom: 14,
            zoomControl: false,
            attributionControl: false
        });

        // Add stylish CartoDB Voyager / Positron tiles for high-end Uber aesthetic
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd'
        }).addTo(map);

        mapInstanceRef.current = map;

        // Try getting user's browser location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    map.setView([pos.coords.latitude, pos.coords.longitude], 14);
                },
                () => {
                    console.log('Location permission denied, using default map center');
                }
            );
        }

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    // Update Pickup & Dropoff Markers & Polyline
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Pickup marker
        if (pickupCoords && pickupCoords.ltd && pickupCoords.lng) {
            if (pickupMarkerRef.current) {
                pickupMarkerRef.current.setLatLng([pickupCoords.ltd, pickupCoords.lng]);
            } else {
                pickupMarkerRef.current = L.marker([pickupCoords.ltd, pickupCoords.lng], { icon: pickupIcon }).addTo(map);
            }
        } else if (pickupMarkerRef.current) {
            map.removeLayer(pickupMarkerRef.current);
            pickupMarkerRef.current = null;
        }

        // Dropoff marker
        if (destCoords && destCoords.ltd && destCoords.lng) {
            if (dropoffMarkerRef.current) {
                dropoffMarkerRef.current.setLatLng([destCoords.ltd, destCoords.lng]);
            } else {
                dropoffMarkerRef.current = L.marker([destCoords.ltd, destCoords.lng], { icon: dropoffIcon }).addTo(map);
            }
        } else if (dropoffMarkerRef.current) {
            map.removeLayer(dropoffMarkerRef.current);
            dropoffMarkerRef.current = null;
        }

        // Draw Route line
        if (pickupCoords?.ltd && destCoords?.ltd) {
            const points = [
                [pickupCoords.ltd, pickupCoords.lng],
                [destCoords.ltd, destCoords.lng]
            ];

            if (routeLineRef.current) {
                routeLineRef.current.setLatLngs(points);
            } else {
                routeLineRef.current = L.polyline(points, {
                    color: '#111827',
                    weight: 4,
                    opacity: 0.8,
                    dashArray: '8, 8',
                    lineJoin: 'round'
                }).addTo(map);
            }

            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [80, 80] });
        } else {
            if (routeLineRef.current) {
                map.removeLayer(routeLineRef.current);
                routeLineRef.current = null;
            }
            if (pickupCoords?.ltd) {
                map.panTo([pickupCoords.ltd, pickupCoords.lng]);
            }
        }
    }, [pickupCoords, destCoords]);

    // Update Assigned Driver Marker
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        if (driverCoords && driverCoords.ltd && driverCoords.lng) {
            if (driverMarkerRef.current) {
                driverMarkerRef.current.setLatLng([driverCoords.ltd, driverCoords.lng]);
            } else {
                driverMarkerRef.current = L.marker([driverCoords.ltd, driverCoords.lng], { icon: carIcon }).addTo(map);
            }
        } else if (driverMarkerRef.current) {
            map.removeLayer(driverMarkerRef.current);
            driverMarkerRef.current = null;
        }
    }, [driverCoords]);

    // Simulated Nearby Moving Drivers for Realism
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !showNearbyDrivers) return;

        const center = map.getCenter();
        const baseLat = pickupCoords?.ltd || center.lat;
        const baseLng = pickupCoords?.lng || center.lng;

        // Clear existing nearby cars
        nearbyDriversRef.current.forEach(m => map.removeLayer(m));
        nearbyDriversRef.current = [];

        // Generate 3 simulated drivers around the center
        const offsets = [
            { dLat: 0.004, dLng: 0.003 },
            { dLat: -0.003, dLng: 0.005 },
            { dLat: 0.002, dLng: -0.004 }
        ];

        const markers = offsets.map(off => {
            return L.marker([baseLat + off.dLat, baseLng + off.dLng], { icon: carIcon }).addTo(map);
        });

        nearbyDriversRef.current = markers;

        // Subtle animation simulation
        const interval = setInterval(() => {
            markers.forEach(marker => {
                const cur = marker.getLatLng();
                const jitterLat = (Math.random() - 0.5) * 0.0003;
                const jitterLng = (Math.random() - 0.5) * 0.0003;
                marker.setLatLng([cur.lat + jitterLat, cur.lng + jitterLng]);
            });
        }, 3000);

        return () => {
            clearInterval(interval);
            markers.forEach(m => {
                if (map) map.removeLayer(m);
            });
        };
    }, [pickupCoords, showNearbyDrivers]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-gray-800 flex items-center gap-1.5 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live GPS
            </div>
        </div>
    );
};

export default LiveMap;
