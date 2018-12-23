// const bcrypt = require('bcryptjs');

// const password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

// const hashedPassword = '$2a$10$UbOCkjsgNXpGNP18sLI2UuldIYL32o5rdT4P7ciFxYsbLsnKa/k1q'

// bcrypt.compare(password, hashedPassword, (err, res) => {
//   console.log(res)
// })

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// const jwt = require('jsonwebtoken');

// const data = { id: 10 };

// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// const { SHA256 } = require('crypto-js');

// const message = 'I am user number 4';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Message: ${hash}`);

// const data = { id: 4 };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'something').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'something').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }
