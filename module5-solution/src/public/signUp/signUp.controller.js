(function(){
  "use strict";

  angular.module("public")
    .controller("SignUpController",SignUpController);


  SignUpController.$inject = ['MenuService'];
  function SignUpController(MenuService){
    var signUpCtrl = this;
    signUpCtrl.menuNotExists = false;
    signUpCtrl.success = false;
    signUpCtrl.user = {};

    signUpCtrl.submit = function(){
          signUpCtrl.menuNotExists = false;
          signUpCtrl.success = true;
          MenuService.SaveDetails(signUpCtrl.user);

    };

    signUpCtrl.CheckIfExists = function(){
      if(signUpCtrl.user.shortname!=undefined && signUpCtrl.user.shortname!="")
      {
        var promise = MenuService.getItem(signUpCtrl.user.shortname);

        promise.then(function(response){
            signUpCtrl.user.itemDescription = response.description;
            signUpCtrl.menuNotExists = false;
        }).catch(function(error){
            signUpCtrl.success = false;
            signUpCtrl.menuNotExists = true;
        })
      }
      else{
        signUpCtrl.user.shortname = undefined;
        signUpCtrl.menuNotExists = false;
      }


    };
  }


})();
