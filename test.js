function makeAdder(x) {
    return function (y) {
      return x + y;
    } 
  } 
  
  var addFive = makeAdder(5);
  console.log(addFive(3));