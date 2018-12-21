const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// var id = '5c1c1aa333587838fca4a7a5';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// User.findById(id)
//   .then(data => {
//     if (!data) {
//       return console.log('ID not found');
//     }

//     console.log('User: ', data);
//   })
//   .catch(e => console.log(e));
