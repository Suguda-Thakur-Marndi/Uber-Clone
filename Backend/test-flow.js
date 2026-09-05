const axios = require('axios');
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const TEST_PORT = 4055;
const BASE_URL = `http://localhost:${TEST_PORT}`;

async function runTests() {
    console.log('--- STARTING UBER CLONE FULL INTEGRATION TEST SUITE ---');

    const server = http.createServer(app);
    initializeSocket(server);

    await new Promise((resolve) => server.listen(TEST_PORT, resolve));
    console.log(`[Test Server] Running on ${BASE_URL}`);

    try {
        // 1. Health check
        const healthRes = await axios.get(`${BASE_URL}/health`);
        console.log('✓ Health check passed:', healthRes.data.status);

        // Unique timestamps for testing
        const testId = Date.now();
        const userEmail = `rider_${testId}@test.com`;
        const driverEmail = `driver_${testId}@test.com`;
        const numberPlate = `OD${testId.toString().slice(-4)}AB`;

        // 2. User Registration
        const userRegRes = await axios.post(`${BASE_URL}/users/register`, {
            fullname: { firstname: 'Rider', lastname: 'Test' },
            email: userEmail,
            password: 'password123'
        });
        console.log('✓ User registration passed. ID:', userRegRes.data.user._id);

        // 3. User Login
        const userLoginRes = await axios.post(`${BASE_URL}/users/login`, {
            email: userEmail,
            password: 'password123'
        });
        const userToken = userLoginRes.data.token;
        const userAuthHeader = { headers: { Authorization: `Bearer ${userToken}` } };
        console.log('✓ User login passed. Token received.');

        // 4. Driver Registration
        const driverRegRes = await axios.post(`${BASE_URL}/drivers/register`, {
            fullname: { firstname: 'Driver', lastname: 'Partner' },
            email: driverEmail,
            password: 'password123',
            vehicle: {
                colour: 'Silver',
                capacity: 4,
                vehicleType: 'car',
                vehicleNumberPlate: numberPlate
            }
        });
        console.log('✓ Driver registration passed. Driver ID:', driverRegRes.data.driverId);

        // 5. Driver Login
        const driverLoginRes = await axios.post(`${BASE_URL}/drivers/login`, {
            email: driverEmail,
            password: 'password123'
        });
        const driverToken = driverLoginRes.data.token;
        const driverAuthHeader = { headers: { Authorization: `Bearer ${driverToken}` } };
        console.log('✓ Driver login passed. Driver name:', driverLoginRes.data.driver.fullname.firstname);

        // 6. Maps Autocomplete
        const suggestionsRes = await axios.get(`${BASE_URL}/maps/get-suggestions?input=KIIT`, userAuthHeader);
        console.log('✓ Maps autocomplete passed. Suggestions count:', suggestionsRes.data.length);

        // 7. Maps Coordinates
        const coordsRes = await axios.get(`${BASE_URL}/maps/get-coordinates?address=KIIT+University`, userAuthHeader);
        console.log('✓ Maps coordinates passed. Lat/Lng:', coordsRes.data.ltd, coordsRes.data.lng);

        // 8. Calculate Fare
        const fareRes = await axios.get(
            `${BASE_URL}/rides/get-fare?pickup=KIIT+Square&destination=Bhubaneswar+Railway+Station`,
            userAuthHeader
        );
        console.log('✓ Ride fare calculation passed. Fares: Car = ₹' + fareRes.data.car + ', Auto = ₹' + fareRes.data.auto + ', Moto = ₹' + fareRes.data.moto);

        // 9. Create Ride
        const createRideRes = await axios.post(
            `${BASE_URL}/rides/create`,
            {
                pickup: 'KIIT Square, Bhubaneswar',
                destination: 'Railway Station, Master Canteen',
                vehicleType: 'car'
            },
            userAuthHeader
        );
        const ride = createRideRes.data;
        console.log('✓ Ride creation passed. Ride ID:', ride._id, 'OTP:', ride.otp);

        // 10. Driver Confirms Ride
        const confirmRes = await axios.post(
            `${BASE_URL}/rides/confirm`,
            { rideId: ride._id },
            driverAuthHeader
        );
        console.log('✓ Driver ride confirmation passed. Ride status:', confirmRes.data.status);

        // 11. Driver Starts Ride with OTP
        const startRes = await axios.get(
            `${BASE_URL}/rides/start-ride?rideId=${ride._id}&otp=${ride.otp}`,
            driverAuthHeader
        );
        console.log('✓ Driver ride start with OTP passed. Ride status:', startRes.data.status);

        // 12. Driver Ends Ride
        const endRes = await axios.post(
            `${BASE_URL}/rides/end-ride`,
            { rideId: ride._id },
            driverAuthHeader
        );
        console.log('✓ Driver ride completion passed. Final ride status:', endRes.data.status);

        // 13. Profile verification
        const userProf = await axios.get(`${BASE_URL}/users/profile`, userAuthHeader);
        console.log('✓ User profile endpoint passed for:', userProf.data.user.email);

        const driverProf = await axios.get(`${BASE_URL}/drivers/profile`, driverAuthHeader);
        console.log('✓ Driver profile endpoint passed for:', driverProf.data.driver.email);

        // 14. Logout
        await axios.get(`${BASE_URL}/users/logout`, userAuthHeader);
        console.log('✓ User logout passed.');

        await axios.get(`${BASE_URL}/drivers/logout`, driverAuthHeader);
        console.log('✓ Driver logout passed.');

        console.log('\n=============================================');
        console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY! 🎉');
        console.log('=============================================\n');
    } catch (err) {
        console.error('❌ Test failed:', err.response?.data || err.message);
        process.exit(1);
    } finally {
        server.close();
        process.exit(0);
    }
}

runTests();
