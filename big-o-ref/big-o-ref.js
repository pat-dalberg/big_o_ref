if (Meteor.isClient) {

  Notations = new Mongo.Collection("notations");
  Notations.insert({ 
   name : "constant",
   formula : "O(1)",
   order : 0,
   examples: "Array access, Stack insertion and deletion, Singly-Linked List insertion and deletion, Doubly-Linked List insertion and deletion, Hash Table search, insertion and deletion, Determining if a binary number is even or odd", 
   wikiLink : "http://en.wikipedia.org/wiki/Time_complexity#Constant_time"});

  Notations.insert({ 
    name : "logarithmic", 
    formula : "O(log n)", 
    order : 1, 
    examples: "Binary Search Tree access, search, insertion and deletion, Red-Black Tree access, search, insertion and deletion, Finding an item in a sorted array with a binary search or a balanced search tree", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time"});
  
  Notations.insert({ 
    name : "linear", 
    formula : "O(n)", 
    order : 2, 
    examples: "Array search and insertion, deletion, Stack access and search, Singly-Linked List access and search, Doubly-Linked List access and search, Best Bubble Sort, Best Insertion Sort, Best Shell Sort", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Linear_time"});
  
  Notations.insert({ 
    name : "quadratic", 
    formula : "O(n^2)", 
    order : 3, 
    examples: "Selection Sort, Multiplying two n-digit numbers by a simple algorithm", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Sub-quadratic_time"});
  
  Notations.insert({ 
    name : "expotential", 
    formula : "O(c^n), c > 1", 
    order : 4, 
    examples: "Determining if two logical statements are equivalent using brute-force search", 
    wikiLink :"http://en.wikipedia.org/wiki/Time_complexity#Exponential_time"});
  
  Notations.insert({ 
    name : "factorial", 
    formula : "O(n!)", 
    order : 5, 
    examples: "Solving the traveling salesman problem via brute-force search", 
    wikiLink :"http://en.wikipedia.org/wiki/Bell_number"});
  
  Notations.insert({ 
    name : "n * n factorial", 
    formula : "O(n * n!)", 
    order : 6, 
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
      return Notations.findOne(q);
    }
  });

  var factorial = function(num){
    var tmp = num;
    while(--num > 1){
        tmp *= num;
    }
    return tmp;
  };

  var updateChart = function(){
    $('#chartContainer').empty();    
    var cData = [];
    var idx, op, elem, objData, i, color; 
    switch(Session.get("name")){
      case "constant":
        color = "Green";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }
        break;
      case "logarithmic":
        color = "GreenYellow";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = Math.log(idx) * 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }
        break;
      case "linear":
        color = "Yellow";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = idx * 10; 
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }      
        break;  
      case "quadratic":
        color = "Orange";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = (idx * idx) * 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }
        break;
      case "expotential":
        color = "Purple";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = Math.pow(2,idx) * 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }      
        break;
      case "factorial":
        color = "Red";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = factorial(idx) * 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }      
        break;
      case "n * n factorial":
        color = "Black";
        for(i = 0;i < 10;i++){
          idx = i + 1;
          op = (idx * factorial(idx)) * 10;
          elem = idx * 10;
          objData = {'type':'data', 'Operations':op, 'Elements': elem};
          cData.push(objData);
        }      
        break;     
    }
    var svg = dimple.newSvg("#chartContainer", 590, 400);
    data = dimple.filterData(cData, "type", "data");
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 505, 305);
    var x = myChart.addCategoryAxis("x", "Elements");
    x.addOrderRule("Elements");
    var y = myChart.addMeasureAxis("y", 'Operations');
    y.overrideMax = 100;
    var s = myChart.addSeries("Order", dimple.plot.line);
    s.lineWeight = 5;
    myChart.assignColor("Order",color);
    myChart.draw();    
  };

  Template.notationView.onRendered(function(){
    updateChart();
  });

  Template.body.events({
    "change #notationsList" : function(event){
      Session.set("name",event.currentTarget.value);
      updateChart();
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Notations = new Mongo.Collection("notations");
   });
}
