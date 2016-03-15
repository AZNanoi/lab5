// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	
	$scope.menu = Dinner.getFullMenu();
	for(i=0; i<$scope.menu.length; i++){
		var dish;
		$scope.menu[i].$promise.then(function(dish){
			var ingredients = dish.Ingredients;
			var dishPrice = 0;
			for(j=0; j<ingredients.length; j++){
				dishPrice = dishPrice + ingredients[j].MetricQuantity;
			}
			dish.dishPrice = Number(dishPrice).toFixed(2);
		});
	}
	
	Dinner.getTotalMenuPrice().promise.then(function(res){
		$scope.totalCost = Number(res).toFixed(2);
	});

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
    $scope.$parent.numberOfGuests = $scope.getNumberOfGuests();
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});