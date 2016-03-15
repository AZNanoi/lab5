dinnerPlannerApp.controller('PreparationCtrl', function ($scope,Dinner,$controller) {
	$controller('DinnerCtrl', {$scope: $scope});
});