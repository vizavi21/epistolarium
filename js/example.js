var app = angular.module('plunker', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
      when('/jobs', {templateUrl: 'jobs-partial.html',   controller: JobsCtrl }).
      when('/invoices', {templateUrl: 'invoices-partial.html',   controller: InvoicesCtrl }).
      when('/payments', {templateUrl: 'payments-partial.html',   controller: PaymentsCtrl }).
      otherwise({redirectTo: '/jobs'});
      
      // make this demo work in plunker
      $locationProvider.html5Mode(false);
}]);

function TabsCtrl($scope, $location) {
  $scope.tabs = [
      { link : '#/jobs', label : 'Jobs' },
      { link : '#/invoices', label : 'Invoices' },
      { link : '#/payments', label : 'Payments' }
    ]; 
    
  $scope.selectedTab = $scope.tabs[0];    
  $scope.setSelectedTab = function(tab) {
    $scope.selectedTab = tab;
  }
  
  $scope.tabClass = function(tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
}

function JobsCtrl($scope) {
  
}

function InvoicesCtrl($scope) {
  
}

function PaymentsCtrl($scope) {
  
}