var MyMath = (function(){
 
    // Put your private variables and functions here
     
    return { // Here are the public methods
        add:function(a, b){
            return a + b;
        }
    };
})();
 
//console.log(MyMath.add(1, 2));


var MyMath = (function(){
 
    // With this pattern you can use the usual function notation:
     
    function add(a, b){
        return a + b;
    }
     
    return {
        add:add // But don't forget to declare it in the returned object!
    };
})();
 
//console.log(MyMath.add(1, 2));

/**
 * Now requireJS methods
 */
require(['MyMath'], function(mathModules){
     
	console.log('through require JS ' + mathModules.add(1, 2));
    console.log('through require JS ' + mathModules.sub(2, 1));
 
});

require(['Models/User'], function(User){
     
    var users = [new User('Barney'),
                 new User('Cartman'),
                 new User('Sheldon')];
     
    for (var i = 0, len = users.length; i < len; i++){
        console.log(users[i].name);
    }
     
    localStorage.users = JSON.stringify(users);
});

require(['Models/User', 'Controllers/ListController'], function(User, ListController){
     
    var users = [new User('Barney'),
                 new User('Cartman'),
                 new User('Sheldon')];
     
    localStorage.users = JSON.stringify(users);
     
    ListController.start(); 
});
