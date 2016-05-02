(function(){
  'use strict'
  angular.module('angularDemo', ['ngMaterial']); //initialize module

  //can reference model instead of creating a global variable
  angular.module('angularDemo').controller('angularController', 
                                           ['$scope','ProductDataService', function($scope, ProductDataService) { 
    var products = ProductDataService.getSampleData();
    $scope.Fruits = products; //use $scope to expose to the view

    //create checkbox filters on the fly with dynamic data
    var filters = [];
    _.each(products, function(product) {
      _.each(product.properties, function(property) {      
        var existingFilter = _.findWhere(filters, { name: property.name });

        if (existingFilter) {
          var existingOption = _.findWhere(existingFilter.options, { value: property.value });
          if (existingOption) {
            existingOption.count += 1;
          } else {
            existingFilter.options.push({ value: property.value, count: 1 }); 
          }   
        } else {
          var filter = {};
          filter.name = property.name;
          filter.options = [];
          filter.options.push({ value: property.value, count: 1 });
          filters.push(filter);      
        }   
      });
    });
    $scope.Filters = filters;

    this.toggleAll = function($event, includeAll) {       
      _.each(filters, function(filterCategory) {      
        _.each(filterCategory.options, function(option) {
          option.IsIncluded = includeAll;
        });
      });    
    };
  }]);

  angular.module('angularDemo').filter('dynamicFilter', function () {
    return function (products, filterCategories, scope) {
      var filtered = [];

      var productFilters = _.filter(filterCategories, function(fc) {
        return  _.any(fc.options, { 'IsIncluded': true });
      });

      _.each(products, function(prod) {
        var includeProduct = true;
        _.each(productFilters, function(filter) {
          var props = _.filter(prod.properties, { 'name': filter.name });
          if (!_.any(props, function(prop) { return _.any(filter.options, { 'value': prop.value, 'IsIncluded': true }); })) {
            includeProduct = false;
          }
        });
        if (includeProduct) {
          filtered.push(prod);
        }
      });
      return filtered;
    };
  });

  angular.module('angularDemo').service('ProductDataService', function() {
    var service = {};

    //sample data
    var products = [
      {
        name: 'Chrysoloras to XYZ',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Guarino' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'long' }            
        ]
      },{
        name: 'Filelfus to Guarino',
        properties: [
            { name:'sender', value:'Franciscus Filelfus' },
            { name:'addressee', value:'Guarino' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Latin' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'long' }        ]
      },{
        name: 'Guarino to Chrysoloras',
        properties: [
            { name:'sender', value:'Guarino Veronese' },
            { name:'addressee', value:'Manuel Chrysoloras' },
            { name:'type', value:'commercial' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'long' }, 
            { name:'genre', value:'informative' }        
        ]
      },{
        name: 'Argyropoulos to Lorenzo de Medici',
        properties: [
            { name:'sender', value:'John Argyropoulos' },
            { name:'addressee', value:'Lorenzo de Medici' },
            { name:'type', value:'patronage' }, 
            { name:'language', value:'Latin' }, 
            { name:'size', value:'long' }, 
            { name:'genre', value:'advisory' }
        ]
      },{
        name: 'Isidore to Bessarion',
        properties: [
            { name:'sender', value:'Isidore of Kiev' },
            { name:'addressee', value:'Bessarion' },
            { name:'type', value:'patronage' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'long' }, 
            { name:'genre', value:'advisory' }
        ]
      },{
        name:'Colluccio to Kydones',
        properties: [
            { name:'sender', value:'Colluccio Salutati' },
            { name:'addressee', value:'Demetrios Kydones' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Latin' }, 
            { name:'size', value:'long' }, 
            { name:'genre', value:'praising' }
        ]
      },{
        name:'Cyriaco to Gattilusio',
        properties: [
            { name:'sender', value:'Cyriaco of Ancona' },
            { name:'addressee', value:'Francesco Gattilusio' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Latin' }, 
            { name:'size', value:'long' }, 
            { name:'genre', value:'praising' }
        ]
      }     
    ];


    service.getSampleData = function() {
      return products;
    };

    return service;
  });

})();