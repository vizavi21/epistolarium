(function(){
  'use strict'
  angular.module('angularDemo', ['ngMaterial']); //initialize module

  //can reference model instead of creating a global variable
  angular.module('angularDemo').controller('angularController', 
                                           ['$scope','ProductDataService', function($scope, ProductDataService) { 
    var products = ProductDataService.getSampleData();
    $scope.Fruits = products; // expose to the view

    //create checkbox filters
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

    //data
    var products = [
      {
        name: 'Manuel Chrysoloras to Coluccio Salutati',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1397-1398',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Coluccio Salutati' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Coluccio Salutati',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1397-1399',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Coluccio Salutati' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      },{
        name: 'Manuel Chrysoloras to Maximos Chrysoberges',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1398-1399',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Maximos Chrysoberges' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      },{
        name: 'Manuel Chrysoloras to Pope Innocent VII during the Western Schism',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1404',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Pope Isidore VII' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Leonardo Bruni',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1410',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Leonardo Bruni' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Manuel II Palaiologos',
        content: 'Comparison between Rome and New Rome.',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1411',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Manuel II Palaiologos' },
            { name:'type', value:'panegyrical' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to John Chrysoloras',
        content: 'To his nephew',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1411',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'John Chrysoloras' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Demetrios Chrysoloras',
        content: 'To his ...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1412',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Demetrios Chrysoloras' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Palla Strozzi',
        content: 'To his ...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1413',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Palla Strozzi' },
            { name:'type', value:'consolatory' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Guarino Veronese',
        content: 'To his ...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1412',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Guarino Veronese' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Guarino Veronese',
        content: 'To his two...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1412',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Guarino Veronese' },
            { name:'type', value:'literary' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Uberto Decembrio',
        content: 'To his two...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1413',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Uberto Decembrio' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Ambrogio Traversari',
        content: 'To his two...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1413',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Ambrogio Traversari' },
            { name:'type', value:'literary' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Palla Strozzi',
        content: 'To his two...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1412',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Palla Strozzi' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      }, {
        name: 'Manuel Chrysoloras to Manuel II Palaiologos',
        content: 'To his two...',
        sender: 'Manuel Chrysoloras',
        connectedWith: 'Manuel II Palaiologos, Guarino Veronese, Demetrios Kydones',
        context: 'XYZcontext',
        date: '1414',
        properties: [
            { name:'sender', value:'Manuel Chrysoloras' },
            { name:'addressee', value:'Manuel II Palaiologos' },
            { name:'type', value:'panegyrical' }, 
            { name:'language', value:'Greek' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'n/a' }            
        ]
      },{
        name: 'Filelfus to Guarino',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
        properties: [
            { name:'sender', value:'Franciscus Filelfus' },
            { name:'addressee', value:'Guarino' },
            { name:'type', value:'friendly' }, 
            { name:'language', value:'Latin' }, 
            { name:'size', value:'medium' }, 
            { name:'genre', value:'long' }        ]
      },{
        name: 'Guarino to Chrysoloras',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
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
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
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
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
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
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
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
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        sender: 'Cyriaco',
        connectedWith: 'Valla, Manuel, XYZ',
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