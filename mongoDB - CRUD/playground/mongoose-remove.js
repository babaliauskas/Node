const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove({ id: '5c1c639a390542f04aad8206' }).then(data => {
//   console.log(data);
// });

// Todo.findByIdAndRemove('5c1c639a390542f04aad8206').then(data => {
//   console.log(data);
// });
