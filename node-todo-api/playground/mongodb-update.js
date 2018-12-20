const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID('5c1be193390542f04aad5e01')
    //     },
    //     {
    //       $set: {
    //         completed: false
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));

    db.collection('Users')
      .findOneAndUpdate(
        {
          name: 'Rimas'
        },
        {
          $set: {
            name: 'Lukas'
          },
          $inc: { age: 1 }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => console.log(result))
      .catch(err => console.log(err));

    // client.close()
  }
);
