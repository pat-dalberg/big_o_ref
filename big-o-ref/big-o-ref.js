if (Meteor.isClient) {
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
  Notations.insert({name : "constant",
   formula : "O(1)",
   order : 0,
   chartData :[{'type':'data','operationsValue': 10, 'elementsValue':10},
     {'type':'data','operationsValue': 10, 'elementsValue':20},
     {'type':'data','operationsValue': 10, 'elementsValue':30},
     {'type':'data','operationsValue': 10, 'elementsValue':40},
     {'type':'data','operationsValue': 10, 'elementsValue':50},
     {'type':'data','operationsValue': 10, 'elementsValue':60},
     {'type':'data','operationsValue': 10, 'elementsValue':70},
     {'type':'data','operationsValue': 10, 'elementsValue':80},
     {'type':'data','operationsValue': 10, 'elementsValue':90},
     {'type':'data','operationsValue': 10, 'elementsValue':100},
     {'type':'data','operationsValue': 10, 'elementsValue':110},
    ],
   examples: "Array access, Stack insertion and deletion, Singly-Linked List insertion and deletion, Doubly-Linked List insertion and deletion, Hash Table search, insertion and deletion, Determining if a binary number is even or odd", 
   wikiLink : "http://en.wikipedia.org/wiki/Time_complexity#Constant_time"});

  Notations.insert({name : "logarithmic", 
    formula : "O(log n)", 
    order : 1, 
    chartData :[],
    examples: "Binary Search Tree access, search, insertion and deletion, Red-Black Tree access, search, insertion and deletion, Finding an item in a sorted array with a binary search or a balanced search tree", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time"});
  
  Notations.insert({name : "linear", 
    formula : "O(n)", 
    order : 2, 
    chartData :[],
    examples: "Array search and insertion, deletion, Stack access and search, Singly-Linked List access and search, Doubly-Linked List access and search, Best Bubble Sort, Best Insertion Sort, Best Shell Sort", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Linear_time"});
  
  Notations.insert({name : "quadratic", 
    formula : "O(n^2)", 
    order : 3, 
    chartData :[],
    examples: "Selection Sort, Multiplying two n-digit numbers by a simple algorithm", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Sub-quadratic_time"});
  
  Notations.insert({name : "expotential", 
    formula : "O(c^n), c > 1", 
    order : 4, 
    chartData :[],
    examples: "Determining if two logical statements are equivalent using brute-force search", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Exponential_time"});
  
  Notations.insert({name : "factorial", 
    formula : "O(n!)", 
    order : 5, 
    chartData :[],
    examples: "Solving the traveling salesman problem via brute-force search", 
    wikiLink :"http://en.wikipedia.org/wiki/Bell_number"});
  
  Notations.insert({name : "n * n factorial", 
    formula : "O(n * n!)", 
    order : 6, 
    chartData :[],
    examples: "Bogosort", 
    wikiLink :"http://en.wikipedia.org/wiki/Bogosort"});

Template.body.helpers({
    notations : [
      {name : "constant"},
      {name : "logarithmic"},
      {name : "linear"},
      {name : "quadratic"},
      {name : "expotential"},
      {name : "factorial"},
      {name : "n * n factorial"}
   ]
});

  Template.notationView.helpers({
    theName : function(){
      var q = {name:Session.get("name")};
      //console.log('Template.notationView.helpers : theName',Notations.find(q));
      return Notations.findOne(q);
    }
  });

  Template.notationView.onRendered(function(){
    console.log('Template.notationView.onRendered');
    var q = {name:Session.get("name")};
    var cData = Notations.findOne(q).chartData;
    var svg = dimple.newSvg("#chartContainer", 590, 400);
    data = dimple.filterData(cData, "type", "data");
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 505, 305);
    var x = myChart.addCategoryAxis("x", "elementsValue");
    x.addOrderRule("elementsValue");
    myChart.addMeasureAxis("y", "operationsValue");
    var s = myChart.addSeries(null, dimple.plot.line);
    myChart.draw();
  });

  Template.body.events({
    "change #notationsList" : function(event){
      Session.set("name",event.currentTarget.value);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Notations = new Mongo.Collection("notations");
  });
}
