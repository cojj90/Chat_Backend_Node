import { person } from "./person";
//import { Observable} from 'rxjs/Observable';
import * as redis  from "redis"; //same as var redis = require("redis")

console.log(person.firstName + ' ' + person.lastName);


let client = redis.createClient({"port": "63799"});

let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

//Observable.of(1,2,3);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

/*
client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
*/
