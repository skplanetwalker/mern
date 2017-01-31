function Car(){
    this.color = "Red";
}

Car.prototype.log = function () {
    console.log( "This Car is " + this.color);
}

module.exports = Car;