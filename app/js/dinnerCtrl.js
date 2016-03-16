// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
	$scope.error = false;

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.getFullMenu = function(){
  	var response = Dinner.getFullMenu();
  	if(response == "error"){
  		$scope.error = true;
  		$scope.status = "There was an error!";
  	}else{
  		$scope.menu = response;
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
  	}
  }

	$scope.getTotalMenuPrice = function(){
		Dinner.getTotalMenuPrice().promise.then(function(res){
			var p = parseFloat(res) + parseFloat($scope.$parent.pending);
			$scope.$parent.totalCost = Number(p).toFixed(2);
		});
	}
	
	$scope.numberOfGuests = $scope.getNumberOfGuests();
	$scope.getFullMenu();
	$scope.getTotalMenuPrice();

	$scope.setNumberOfGuest = function(number){
	  Dinner.setNumberOfGuests(number);
	  $scope.$parent.numberOfGuests = $scope.getNumberOfGuests();
	  $scope.getFullMenu();
	  $scope.getTotalMenuPrice();
	}

	$scope.removeDish = function(obj){
		Dinner.removeDishFromMenu(obj.target.parentNode.id);
		$scope.getFullMenu();
		$scope.getTotalMenuPrice();
	}

});