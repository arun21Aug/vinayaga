var Imap = require('imap');
inspect = require('util').inspect;
var fs = require('fs'), fileStream;
const simpleParser = require('mailparser').simpleParser;


var imap = new Imap({
  user: 'arunkumar3ece@gmail.com', // put your mail email
  password: 'Arun!123', // put your mail password or your mail app password
  host: 'imap.gmail.com', // put your mail host
  port: 993, // your mail host port
  tls: true 
})
function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
      }
    imap.once('ready', function() {
    openInbox(function(err, box) {
    if (err) throw err;
    imap.search([ 'UNSEEN', ['SINCE', 'JULY 18, 2021'] ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results, { bodies: '' });
    f.on('message', function(msg, seqno) {
    // console.log('Message #%d', seqno);
    var prefix = '(#' + seqno + ') ';
    msg.on('body', function(stream, info) {
        simpleParser(stream, {}, (err, parsed) => {
            console.log(parsed.text);
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        });
    
   // stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
    });
    msg.once('attributes', function(attrs) {
     //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
    });
    msg.once('end', function() {
    console.log(prefix + 'Finished');
    });
    });
    f.once('error', function(err) {
    console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
    console.log('Done fetching all messages!');
    imap.end();});
        });
      });
    });
    imap.once('error', function(err) {
    console.log(err);
    });
    imap.once('end', function() {
    console.log('Connection ended');
    });
    imap.connect();
    