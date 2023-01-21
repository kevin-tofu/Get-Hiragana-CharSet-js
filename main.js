
const fs = require('fs')
const os = require('os')

const permutation = ({ result = [], pre = [], post, n = post.length }) => {
  if (n > 0) {
    post.forEach((_, i) => {
      const rest = [...post];
      const elem = rest.splice(i, 1);
      permutation({ result, pre: [...pre, ...elem], post: rest, n: n - 1});
    });
  } else {
    result.push(pre);
  }
  return result;
};

function make_ranged_array(start, length){
    return [...Array(length)].map((_, i) => {
        return start + i
    })
}  

function get_hiragana (remove_charset_code) {
    
  return make_ranged_array(12354, 82)
    .filter((value, index) => {
      return !remove_charset_code.includes(value)
    })
    .map((value, index) => {
      return {index: index, code: value, char: String.fromCharCode(value)};
    })
}

function export_array_as_file(path_dst, array) {
  const logger = fs.createWriteStream(path_dst, {
    flags: 'w' 
  })
  const endOfLine = require('os').EOL;
  array.forEach((value) => {
    logger.write(value + '\n')
  })
  logger.write(endOfLine)
}
  

function get_hiragana() {
  
  return hiragana
}

function main(){

  const charset_small = [12355, 12357, 12359, 12361, 12387, 12419, 12421, 12423]
  const hiragana = get_hiragana(charset_small)
  console.log(hiragana, hiragana.length)
    
  const hiragana_perm = permutation({post: hiragana, n: 2})
    .map(( value ) => { 
      return value.reduce((accumulator, currentValue, currentIndex, array) => { 
        return accumulator.char + currentValue.char 
      }) 
    })
  console.log(hiragana_perm, hiragana_perm.length)
  const fpath_dst = './hiragana-perm.txt'
  export_array_as_file(fpath_dst, hiragana_perm)
}

main()
