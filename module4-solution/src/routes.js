(function(){
  'use strict';

    angular.module('MenuApp')
      .config(RoutesConfig);

      RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){

      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      // *** Set up UI states ***
    $stateProvider

    //Home page
    .state('home',{
      url : '/',
      templateUrl: 'src/templates/home.template.html'
    })

    .state('categoryList',{
      url : '/category-list',
      templateUrl: 'src/templates/menuApp-category-list.template.html',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
          categories: ['MenuDataService',function(MenuDataService){
            return MenuDataService.getAllCategories();
          }]
      }
    })

    .state('categoryList.item',{
      url: '/item/{categoryShortName}',
      templateUrl: 'src/templates/menuApp-item.template.html',
      controller: 'ItemsController as itemCtrl',
      resolve: {
        item: ['MenuDataService','$stateParams', function(MenuDataService,$stateParams){
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });

    };
})();
