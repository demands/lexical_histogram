var StringScanner = require("StringScanner");
var ss = new StringScanner("abc123 def456");
// #<StringScanner 0/13 @ "abc12...">

ss.reset()          // #<StringScanner 0/13 @ "abc12...">
console.log(ss.pointer())        // 0
ss.bol()            // true
ss.scan(/./)        // "a"
console.log(ss.pointer())        // 1
ss.bol()            // false


