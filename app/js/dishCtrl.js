// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
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
     for (i=0; i < data.Ingredients.length; i++) {
     	$scope.price = $scope.price + parseFloat(data.Ingredients[i].MetricQuantity)*Dinner.getNumberOfGuests();
  	};
   },function(data){
     $scope.status = "There was an error";
   });

  $scope.confirmButton = function($event){
  	Dinner.addDishToMenu(dishId, $scope.cat);
  	return false;
  }
  
});