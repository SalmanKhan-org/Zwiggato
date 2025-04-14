exports.generateVerificationCode = (len = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let verificationCode = "";
    const charactersLength = characters.length;

    for (let i = 0; i < len; i++) {
        // Generate a random index within the valid range
        const randomIndex = Math.floor(Math.random() * charactersLength);
        verificationCode += characters.charAt(randomIndex);
    }

    return verificationCode;
};
