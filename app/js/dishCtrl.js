// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.dish = "";
  $scope.price = 0;
  $scope.cat = "";
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  var dishId = $routeParams.dishId;
  Dinner.Dish.get({id:dishId},function(data){
    $scope.dish=data;
    $scope.cat = data.Category;
    var p = 0;
    for (i=0; i < data.Ingredients.length; i++) {
   	  p = p + parseFloat(data.Ingredients[i].MetricQuantity)*Dinner.getNumberOfGuests();
    };
    $scope.price = Number(p).toFixed(2);
  },function(data){
    $scope.status = "There was an error";
  });

  $scope.isInt = function(n) {
    return n % 1 === 0;
  }

  $scope.float2Int = function(number){
    if($scope.isInt(number)){
      return number;
    }else{
      return Number(number).toFixed(2);
    }
  }

  $scope.confirmButton = function($event){
  	Dinner.addDishToMenu(dishId, $scope.cat);
  	return false;
  }
  
});