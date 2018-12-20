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

    // db.collection('Todos').insertOne({
    //   text: 'Something to do',
    //   completed: false
    // }, (error, result) => {
    //   if (error) {
    //     return console.log('Unable to insert todo', error)
    //   }

    //   console.log(JSON.stringify(result.ops, undefined, 4))
    // })

    // db.collection('Users').insertOne({
    //   name: 'Lukas',
    //   lastName: 'Babaliauskas',
    //   age: 21,
    //   location: 'Irvine, CA',

    // }, (err, result) => {
    //   if (err) {
    //     return console.log('Error inserting into users')
    //   }
    //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 4))
    // })

    client.close();
  }
);
