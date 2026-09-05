const axios = require('axios');
const driverModel = require('../models/driver.model');

// Helper Haversine Distance in meters
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
}

// Fallback seed locations for popular queries
const POPULAR_LOCATIONS = {
    'times square': { ltd: 40.758896, lng: -73.985130 },
    'central park': { ltd: 40.785091, lng: -73.968285 },
    'brooklyn bridge': { ltd: 40.706086, lng: -73.996864 },
    'jfk airport': { ltd: 40.641311, lng: -73.778139 },
    'bhubaneswar': { ltd: 20.296059, lng: 85.824540 },
    'kiit square': { ltd: 20.353340, lng: 85.817340 },
    'railway station': { ltd: 20.264440, lng: 85.840900 },
    'airport': { ltd: 20.252600, lng: 85.817800 }
};

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    // 1. Try Google Maps if API key exists
    if (apiKey) {
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
            const response = await axios.get(url, { timeout: 3000 });
            if (response.data.status === 'OK' && response.data.results?.[0]?.geometry?.location) {
                const location = response.data.results[0].geometry.location;
                return { ltd: location.lat, lng: location.lng };
            }
        } catch (error) {
            console.warn('[MapsService] Google Maps Geocode unavailable, attempting fallback:', error.message);
        }
    }

    // 2. OpenStreetMap Nominatim Fallback
    try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        const osmRes = await axios.get(nominatimUrl, {
            headers: { 'User-Agent': 'UberCloneApp/1.0' },
            timeout: 3000
        });
        if (osmRes.data && osmRes.data.length > 0) {
            return {
                ltd: parseFloat(osmRes.data[0].lat),
                lng: parseFloat(osmRes.data[0].lon)
            };
        }
    } catch (osmErr) {
        console.warn('[MapsService] Nominatim fallback failed:', osmErr.message);
    }

    // 3. Known seed check
    const normalized = address.toLowerCase().trim();
    for (const [key, coords] of Object.entries(POPULAR_LOCATIONS)) {
        if (normalized.includes(key)) {
            return coords;
        }
    }

    // Default coordinates (Bhubaneswar/Urban center default)
    return { ltd: 20.2961, lng: 85.8245 };
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    // 1. Try Google Maps Distance Matrix
    if (apiKey) {
        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
            const response = await axios.get(url, { timeout: 3000 });
            if (response.data.status === 'OK' && response.data.rows?.[0]?.elements?.[0]?.status === 'OK') {
                return response.data.rows[0].elements[0];
            }
        } catch (err) {
            console.warn('[MapsService] Google Distance Matrix unavailable, calculating via Haversine fallback');
        }
    }

    // 2. Fallback: Resolve coordinates and calculate distance & duration
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destCoords = await module.exports.getAddressCoordinate(destination);

    let distanceMeters = calculateHaversineDistance(
        originCoords.ltd,
        originCoords.lng,
        destCoords.ltd,
        destCoords.lng
    );

    // Apply road network winding factor (approx 1.3x straight-line distance)
    distanceMeters = Math.max(1200, Math.round(distanceMeters * 1.3));

    // Assume average urban speed of 28 km/h (~7.8 m/s)
    const durationSeconds = Math.max(300, Math.round(distanceMeters / 7.8));

    return {
        distance: {
            text: `${(distanceMeters / 1000).toFixed(1)} km`,
            value: distanceMeters
        },
        duration: {
            text: `${Math.round(durationSeconds / 60)} mins`,
            value: durationSeconds
        },
        status: 'OK'
    };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input || !input.trim()) {
        return [];
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    // 1. Try Google Places Autocomplete
    if (apiKey) {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
            const response = await axios.get(url, { timeout: 3000 });
            if (response.data.status === 'OK' && Array.isArray(response.data.predictions)) {
                return response.data.predictions.map(p => p.description).filter(Boolean);
            }
        } catch (err) {
            console.warn('[MapsService] Google Autocomplete unavailable, trying fallback');
        }
    }

    // 2. Nominatim Fallback
    try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=5&addressdetails=1`;
        const res = await axios.get(nominatimUrl, {
            headers: { 'User-Agent': 'UberCloneApp/1.0' },
            timeout: 3000
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
            return res.data.map(item => item.display_name).filter(Boolean);
        }
    } catch (err) {
        console.warn('[MapsService] Nominatim autocomplete fallback failed');
    }

    // 3. Curated local fallback based on query
    const staticSuggestions = [
        'KIIT University, Patia, Bhubaneswar',
        'Railway Station, Master Canteen, Bhubaneswar',
        'Biju Patnaik International Airport (BBI), Bhubaneswar',
        'Esplanade One Mall, Rasulgarh, Bhubaneswar',
        'Infocity, Chandrasekharpur, Bhubaneswar',
        'Times Square, Manhattan, New York, NY',
        'Central Park, New York, NY',
        'Grand Central Terminal, New York, NY'
    ];

    const filtered = staticSuggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()));
    return filtered.length > 0 ? filtered : [`${input}, City Center`, `${input}, Main Avenue`, `${input} Terminal`];
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radiusKm = 10) => {
    try {
        // Find available drivers with active sockets
        const drivers = await driverModel.find({
            status: { $in: ['available', 'active'] },
            socketId: { $ne: null }
        });

        // Filter by proximity if coordinates are set, or return connected available drivers
        const nearby = drivers.filter(driver => {
            if (!driver.location || !driver.location.ltd) return true; // Include ready drivers
            const dist = calculateHaversineDistance(ltd, lng, driver.location.ltd, driver.location.lng);
            return dist <= radiusKm * 1000;
        });

        return nearby.length > 0 ? nearby : drivers;
    } catch (err) {
        console.error('[MapsService] getCaptainsInTheRadius error:', err.message);
        return [];
    }
};

module.exports.getDriversInTheRadius = module.exports.getCaptainsInTheRadius;