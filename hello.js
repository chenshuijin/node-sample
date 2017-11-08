var s = function(x){
    return function(y){return x +y;};
};


var ada = function(x,f){
    x = x+1;
    return f(x);
};

var a = function(x){
    return x + 2;
};

console.log(ada(1,a));

console.log(s(2)(3));
