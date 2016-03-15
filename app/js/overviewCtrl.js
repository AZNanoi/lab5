//Overview controller is used whenenever the user has confirmed the dinner and 
//wants to see an overview of the selected menu
dinnerPlannerApp.controller('OverviewCtrl', function ($scope, Dinner, $controller) {
	$controller('DinnerCtrl', {$scope: $scope});

	Dinner.getTotalMenuPrice().promise.then(function(res){
		$scope.totalCost = Number(res).toFixed(2);
	});
});