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

    db.collection('Users')
      .find()
      .toArray()
      .then(docs => {
        console.log(JSON.stringify(docs, undefined, 4));
      })
      .catch(err => console.log(err));

    // client.close()
  }
);
