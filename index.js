const MongoClint = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017';
const dbname = 'nucampsite';

MongoClint.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); 

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            })
        })
    })
});