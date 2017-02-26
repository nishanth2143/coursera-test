(function(){
  'use strict';

  angular.module('MenuApp')
    .component('categoryList',{
      templateUrl: 'src/templates/category-list.template.html',
      bindings: {
        categories: '<'
      }
    });

})();
