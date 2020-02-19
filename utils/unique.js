module.exports = function unique(arr) {
  return arr.filter(function(item, index, arr) {
    return arr.indexOf(item, 0) === index
  })
}