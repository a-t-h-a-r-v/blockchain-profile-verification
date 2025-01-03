const ProfileVerification = artifacts.require("ProfileVerification");

module.exports = function (deployer) {
    deployer.deploy(ProfileVerification);
};
