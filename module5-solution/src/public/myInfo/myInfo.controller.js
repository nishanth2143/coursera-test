(function(){
  'use strict';

  angular.module('public')
    .controller('MyInfoController',MyInfoController);

    MyInfoController.$inject = ['information','MenuService'];
    function MyInfoController(information,MenuService){
      var myInfoCtrl = this;

      myInfoCtrl.user = information;

      if(JSON.stringify(myInfoCtrl.user).length > 2)
      {
        if(myInfoCtrl.user.shortname != undefined)
        {
          myInfoCtrl.user.short = myInfoCtrl.user.shortname.replace(/[0-9]/g, '');
          MenuService.getName(myInfoCtrl.user.short).then(function(response){
            myInfoCtrl.user.itemName = response.name;
          });
        }
        myInfoCtrl.showDetails = true;
        myInfoCtrl.showSignUp = false;
      }
      else {
        myInfoCtrl.showDetails = false;
        myInfoCtrl.showSignUp = true;
      }

    }
})();
