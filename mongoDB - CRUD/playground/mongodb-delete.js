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

    // deleteMany
    // db.collection('Users')
    //   .deleteMany({ age: 21 })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));

    // deleteOne
    // db.collection('Todos')
    //   .deleteOne({ text: 'Eat lunch' })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));

    // findAndDelete
    db.collection('Users')
      .findOneAndDelete({
        name: 'Rimas'
      })
      .then(result => {
        console.log(JSON.stringify(result, undefined, 4));
      })
      .catch(err => console.log(err));

    // client.close()
  }
);
