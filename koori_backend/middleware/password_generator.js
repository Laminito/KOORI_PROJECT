const generator = require('generate-password');

const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false
});

// 'uEyMTw32v9'
console.log(password);

module.exports = {
    password
}