const driverController = require('./driver.controller');

module.exports = {
    registerCaptain: driverController.registerDriver,
    loginCaptain: driverController.loginDriver,
    getCaptainProfile: driverController.getDriverProfile,
    logoutCaptain: driverController.logoutDriver
};
