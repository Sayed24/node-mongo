const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection:', result);
        return dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
        'campsites');
    })
    .then(result => {
        console.log('Insert Document:', result.ops);
        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);
        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test" }, 'campsites');

    })
    .then(result => {
        console.log('Updated Document:', result.result);
        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Updated Documents:', docs);                        
        return db.dropCollection('campsites');
    })
    .then(result => {
        console.log('Dropped Collection:', result);
        return client.close();
    })
    .catch(err => console.log(err));

})
.catch(err => console.log(err));