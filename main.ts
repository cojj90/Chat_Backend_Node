import { person } from "./person";
import * as Rx from 'rxjs/Rx';
import * as redis  from "redis"; //same as var redis = require("redis")

console.log(person.firstName + ' ' + person.lastName);


let client = redis.createClient({"port": "63799"});

let subject = new Rx.Subject();
let obs = subject.asObservable();

let counter = 0;
setInterval(()=>{
    subject.next(counter++);
}, 5000);


obs.subscribe(
    (count)=>{
        console.log(count);
    }
)

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
