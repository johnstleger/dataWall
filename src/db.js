// Shared db connection - https://www.terlici.com/2015/04/03/mongodb-node-express.html

let MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    dbUrl = process.env.DB_URL,
    state = {};

exports.connect = function(done) {
    if ( state.db ){ return; done(); }
    MongoClient.connect( dbUrl , function(err, mongodb) {
        if(err){ console.log(err); done(err); return;  }
        state.db = mongodb;
        done();
    });
}

exports.getCollection = function(collection){
    return new Promise((fulfill,reject)=>{
        state.db.collection(collection).find().limit(1).sort({$natural:-1}).toArray((err,record)=>{
            if(err || (!record.length) ){ console.log("error", err); fulfill({}); return; }
            fulfill(record[0]);
        });
    });
}

exports.saveItem = function(collection,item){
    return new Promise((fulfill,reject)=>{
        state.db.collection(collection).insert(item,(err, records)=>{
            if(err) return console.log('Save Item', err);
            fulfill(item);
        });
    });
}

exports.get = function(){
    return state.db;
}