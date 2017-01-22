(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController )
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
    .directive('foundItems',FoundItemsDirective);


    function FoundItemsDirective(){
      var ddo = {
          templateUrl: 'itemsFound.html',
          scope: {
              items: '<',
              message: '<',
              name: '<',
              shortname:'<',
              description: '<',
              onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'narrowDown',
          bindToController: true
      };

      return ddo;
    }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService){
    var narrowDown = this;
    narrowDown.searchTerm = "";
    narrowDown.name = "";
    narrowDown.shortname = "";
    narrowDown.description = "";
    narrowDown.message = "";
    narrowDown.show = false;

    narrowDown.DisplayResult = function(){

        MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm).then(function(value)
        {
            narrowDown.items = value;
            if(narrowDown.items.length == 0)
            {
              narrowDown.message = "Nothing found!.";
              narrowDown.name = "";
              narrowDown.shortname = "";
              narrowDown.description = "";
            }
            else {
              narrowDown.message="";
              narrowDown.name = "Name";
              narrowDown.shortname = "Short Name";
              narrowDown.description = "Description";
            }
        });
    };

    narrowDown.removeItem = function(itemIndex){
        narrowDown.items.splice(itemIndex,1);
    };
  }

  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var service = this;
    var foundItems = [];
    service.getMatchedMenuItems = function(searchTerm){
      return $http.get(ApiBasePath + "/menu_items.json").then(function(result){
          if(searchTerm == "")
          {
            foundItems = [];
            return foundItems;
          }
          angular.forEach(result.data, function(value, key)
          {
            foundItems = [];
            for(var i = 0; i< value.length; i++)
            {
              if(value[i].description.indexOf(searchTerm)!= -1)
              {
                foundItems.push(value[i]);
              }
            }
          });
          return foundItems;
        })
    }
  }


})();
