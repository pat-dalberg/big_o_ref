if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

//  Meteor.startup(function(){
/*
notation schema
name :
alternativeNames: []
order: from zero ascending, with zero being the best
formula:
wikipediaLink:
*/

/*
constant / O(1)
logarithmic / O(log n)
linear / O(n)
quadratic / O(n^2) , O(n*n)
expotential / O(c^n), c > 1
factorial / O(n!)
n * n factorial / O(n * n!)
*/


  Notations = new Mongo.Collection("notations");
  Notations.insert({name : "constant", formula : "O(1)", order : 0});
  Notations.insert({name : "logarithmic", formula : "O(log n)", order : 1});
  Notations.insert({name : "linear", formula : "O(n)", order : 2});
  Notations.insert({name : "quadratic", formula : "O(n^2)", order : 3});
  Notations.insert({name : "expotential", formula : "O(c^n), c > 1", order : 4});
  Notations.insert({name : "factorial", formula : "O(n!)", order : 5});
  Notations.insert({name : "n * n factorial", formula : "O(n * n!)", order : 6});

Template.body.helpers({
    notations : [
      {name : "constant", formula : "O(1)", order : 0},
      {name : "logarithmic", formula : "O(log n)", order : 1},
      {name : "linear", formula : "O(n)", order : 2},
      {name : "quadratic", formula : "O(n^2)", order : 3},
      {name : "expotential", formula : "O(c^n), c > 1", order : 4},
      {name : "factorial", formula : "O(n!)", order : 5},
      {name : "n * n factorial", formula : "O(n * n!)", order : 6}
   ]
});

  Template.notationView.helpers({
    theName : function(){
      var q = {name:Session.get("name")};
      console.log('Template.notationView.helpers : theName',Notations.find(q));
      return Notations.findOne(q);
    }
  });

  // Template.notationElement.helpers({
  //   notations : function(){
  //     console.log('Template.notationElement.helpers notations');
  //     return Notations.find().fetch();
  //   }
  // });

  Template.body.events({
    "change #notationsList" : function(event){
      //window.alert('I DUNNO SOMETHING SELECTED HERP ' + event.currentTarget.value);
      //Template.notationView.__helpers.get('updateView')(event.currentTarget.value);
      Session.set("name",event.currentTarget.value);
    }
  });

//});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Notations = new Mongo.Collection("notations");
  });
}
