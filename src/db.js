// Shared db connection - https://www.terlici.com/2015/04/03/mongodb-node-express.html

let MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    dbUrl = 'mongodb://us_adidas_demo:us_adidas_demo@ds019970.mlab.com:19970/adidas_demo',
    state = {};

exports.connect = function(done) {
    if ( state.db ){ return; done(); }
    MongoClient.connect( dbUrl , function(err, mongodb) {
        if(err){ done(err); return;  }
        state.db = mongodb;
        done();
    });
}

exports.get = function(){
    return state.db;
}