//Overview controller is used whenenever the user has confirmed the dinner and 
//wants to see an overview of the selected menu
dinnerPlannerApp.controller('OverviewCtrl', ['$cookieStore', function ($scope,Dinner,$cookieStore) {
	$scope.numberOfGuests = $cookieStore.get('numberOfGuests')
	//$scope.menu
}]);