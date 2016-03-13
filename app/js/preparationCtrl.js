dinnerPlannerApp.controller('PreparationCtrl', ['$cookieStore', function ($scope,Dinner,$cookieStore) {
	$scope.numberOfGuests = $cookieStore.get('numberOfGuests')
}]);