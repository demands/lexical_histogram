var get = require('get');
var htmlparser = require("htmlparser");
var Scanner = require("StringScanner");
var Hash = require("hashish");

var uri = 'http://maxedmands.com';

var parseDom = function(elements, callback, depth) {
  var i = 0, element = undefined;
  if(depth === undefined) depth = 0;
  while(element = elements[i++]) {
    callback(element, depth);
    if(element.children !== undefined) {
      parseDom(element.children, callback, depth+1);
    }
  }
};

var elementOneLiner = function(element) {
  switch(element.type) {
    case 'tag':
      return '<' + element.name + '>';
    case 'directive':
      return element.data;
    case 'text':
      return '--- TEXT ---';
    default:
      return 'unknown: ' + element.type;
  }
};

var handler = new htmlparser.DefaultHandler(function (err, dom) {
  var wordcount = new Hash();

  if (err) {
    console.log("Parsing error.");
  }
  else {
    parseDom(dom, function(element, depth) {
      var i = 0,
          indent = '',
          scanner = undefined;

      while(i++ < depth) {
        indent += '  ';
      }

      console.log(indent + elementOneLiner(element));

      if(element.type === 'text') {
        scanner = new Scanner(element.data);
        console.log(element.data);
        while(scanner.scan(/./)) {
          console.log(scanner.match());
        }
      }
    });
  }
});

var dl = new get({ uri: uri });

dl.asString(function(err, str) {
  if(!err) {
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(str);
  }
});
