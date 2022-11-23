const bcrypt = require('bcrypt');

//hash password
async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
}
hashIt(password);


// compare the password user entered with hashed pass.
async function compareIt(password) {
    const validPassword = await bcrypt.compare(password, hashedPassword);
}
compareIt(password);