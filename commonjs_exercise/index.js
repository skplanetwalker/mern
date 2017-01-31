var myvar = require('./myvar');
console.log(myvar.a);

var myliteralvar = require('./myliteralvar');
console.log(myliteralvar.a);

var myfunction = require('./myfunction');
var myfunctiona = myfunction.a();
console.log(myfunctiona);

var Myinstance = require('./myinstance');
var i = new Myinstance();
console.log(i.name);

var Car = require('./Car');
var c =  Object.create(Car.prototype);
Car.call(c);
c.log();
