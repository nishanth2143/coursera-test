(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItem = function(shortname) {
    return $http.get(ApiPath + '/menu_items/' + shortname + '.json').then(function(response){
      return response.data;
    });
  }

  service.SaveDetails = function(user) {
    service.user = user;
  }

  service.getDetails = function(){
    return service.user;
  }

  service.getName = function(shortname){
    debugger;
    return $http.get(ApiPath + '/categories/' + shortname + '.json').then(function(response){
      return response.data;
    });
  }

}
})();
