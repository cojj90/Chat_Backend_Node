import { person } from "./person";
import * as redis from "redis"; //same as var redis = require("redis")
import * as Rx from 'rxjs/Rx';

export class Redis {

    constructor() {
        console.log("Running App version " + VERSION);
        console.log(person.firstName + ' ' + person.lastName + ' ' + TEST(9));

        let redisServer = { host: "clean.cojj.eu", port: 2086 };
        let client = redis.createClient(redisServer);

        let subject = new Rx.Subject();
        let obs = subject.asObservable();

        let counter = 0;
        setInterval(() => {
            subject.next(counter++);
        }, 5000);


        // if you'd like to select database 3, instead of 0 (default), call
        // client.select(3, function() { /* ... */ });


        client.on("error", (err) => {
            console.log("Error " + err);
        });
        client.on("ready", () => {
            console.log("READY");
        })

        // client.config('get', 'notify-keyspace-events', function(err, conf) {
        //     console.log(conf);
        //     // [ 'notify-keyspace-events', <value> ]
        //     if (conf[1].indexOf('EKx') < 0) {
        //         client.config('set', 'notify-keyspace-events', conf[1] + 'EKx', function(err) {

        //         });
        //     }
        // });

        let sub = redis.createClient(redisServer);

        sub.subscribe('chat');
        sub.on('message', (channel, message) => {
            console.log("Channel: " + channel);
            console.log("MSG: " + message);
            client.lpush('messages', JSON.stringify({ channel: channel, message: message }), (err, res) => {
                console.log(err);
                console.log(res);
            });
        });
        sub.on('subscribe', (channel, message) => {
            console.log("SUB Channel: " + channel);
            console.log("MSG: " + message);
        });
        sub.on('unsubscribe', (channel, message) => {
            console.log("UNSUB Channel: " + channel);
            console.log("MSG: " + message);
        });

        obs.subscribe(
            (count) => {
                console.log(count);
                //client.publish('chat', "Chat:"+count);
            }
        )
    }
}



// sub.on("pmessage", function (pattern, channel, message) {
//     console.log("("+  pattern +")" + " client received message on " + channel + ": " + message);
//     client.lpush('messages', JSON.stringify({channel: channel, message: message}));
//     switch (channel) {
//         // blah blah blah
//         // ...
//     }
// });
// sub.psubscribe("*");

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

