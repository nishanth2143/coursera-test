(function(){
  'use strict';

  angular.module("ShoppingListCheckOff",[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;
        toBuy.listOfItems = ShoppingListCheckOffService.getToBuyItems();
        toBuy.Bought = function(itemIndex){
          try{
              ShoppingListCheckOffService.addItem(itemIndex);
            }
            catch(error)
            {
              toBuy.empty = error.message;
            }

        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var alreadyBought = this;
            alreadyBought.listOfItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService(){
      var service = this;

      var tobuy = [
        {
       name: "Milk",
       quantity: "2"
       },
       {
         name: "Donuts",
         quantity: "200"
       },
       {
         name: "Cookies",
         quantity: "300"
       },
       {
         name: "Chocolate",
         quantity: "5"
       },
       {
         name: "Peanut Butter",
         quantity: "20"
       }
     ];
      var bought = [];
      service.getToBuyItems = function(){
        return tobuy;
      };

      service.addItem = function(itemIndex){
          var item = tobuy.slice(itemIndex,itemIndex+1);
          tobuy.splice(itemIndex, 1);
          bought.push(item[0]);        
          if(tobuy.length ==0)
          {
            throw new Error("Everything is bought!");
          }

      };

      service.getBoughtItems = function(){
          return bought;
      };

    }
})();
