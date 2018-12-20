// const MongoClient = require('mongodb').MongoClient
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
    //   .find()
    //   .count()
    //   .then(count => {
    //     console.log(`Todos count: ${count}`);
    //     // console.log(JSON.stringify(count, undefined, 4));
    //   })
    //   .catch(err => console.log('Unable to fetch todos', err));

    db.collection('Users')
      .find({ lastName: 'Babaliauskas' })
      .toArray()
      .then(docs => {
        console.log(JSON.stringify(docs, undefined, 4));
      })
      .catch(err => console.log(err));

    // client.close();
  }
);
