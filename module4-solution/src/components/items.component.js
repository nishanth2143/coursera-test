(function(){
'use strict';

  angular.module('MenuApp')
    .component('itemDescription',{
      templateUrl: 'src/templates/item.template.html',
      bindings: {
        item: '<'
      }
    });

})();
