(function(undefined) {
  lexer = {};

  // Hash table
  lexer.dictionary = {};

  // Caches
  var maximum = undefined;
  var frequencySorted = undefined;
  var alphaSorted = undefined;
  var appearanceSorted = undefined;

  // Clear the dictionary
  lexer.clear = function() {
    lexer.dictionary = {};
    lexer.reset();
  }

  // Reset all the caches
  lexer.reset = function() {
    frequencySorted = undefined;
    alphaSorted = undefined;
    appearanceSorted = undefined;
    maximum = undefined;
  }

  // Add a word to the dictionary
  lexer.add = function(word) {
    lexer.reset();
    if(lexer.dictionary[word] === undefined) {
      lexer.dictionary[word] = 1;
    }
    else {
      ++lexer.dictionary[word];
    }
  }

  // Get frequency of a word
  lexer.frequency = function(word) {
    if(lexer.dictionary[word] === undefined) return 0;
    else return lexer.dictionary[word];
  }

  // Analyze a block of text
  lexer.analyze = function(text) {
    var i;
    var words = text.toLowerCase().replace(/[^\s\w]/g, '').split(/\s+/);

    lexer.clear();
    for(i = 0; i < words.length; i++) {
      lexer.add(words[i]);
    }

    return lexer.dictionary;
  }

  lexer.maximum = function() {
    var words = Object.keys(lexer.dictionary),
        i = undefined;

    if(maximum === undefined) {
      for(i = 0; i < words.length; i++) {
        if(maximum === undefined || maximum < lexer.frequency(words[i])) {
          maximum = lexer.frequency(words[i]);
        }
      }
    }
    return maximum;
  }

  // Sort the dictionary 
  lexer.sort = function(sortBy) {
    appearanceSorted = Object.keys(lexer.dictionary);

    switch(sortBy) {
      case 'alpha':
        if(alphaSorted == undefined) alphaSorted = appearanceSorted.sort();
        return alphaSorted;
      case 'appearance':
        return appearanceSorted;
      case 'frequency':
      default:
        if(frequencySorted == undefined) {
          frequencySorted = appearanceSorted.sort(function(left, right) {
            return lexer.frequency(left) < lexer.frequency(right);
          });
        }

        return frequencySorted;
    }

  }

})();
