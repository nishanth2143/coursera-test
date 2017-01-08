(function(){
'use strict';

angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject =['$scope'];

  function LunchCheckController($scope){
    $scope.lunch = "";
    $scope.color = "";
    $scope.buttonText = "Check if too much";
    $scope.placeholder = "list comma separated dishes you usually have for lunch";
    $scope.DisplayTextOnClick = function (){

      var lunch = $scope.lunch;
      var arrayOfStrings = lunch.split(',');
      var emptyStrings = NumberOfEmptyStrings(arrayOfStrings);
      $scope.message = TextToDisplay(arrayOfStrings.length - emptyStrings);
      $scope.color = ColorToDisplay(arrayOfStrings.length - emptyStrings);
    }

  }

  function NumberOfEmptyStrings(arrayOfStrings){
    var empty = 0;
    for(var i =0;i<arrayOfStrings.length;i++)
    {
      if(arrayOfStrings[i] === "")
      {
        empty++;
      }
    }
    return empty;
  }

  function TextToDisplay(length)
  {
    if(length > 3)
      return "Too much!";
    else if(length == 0)
      return "Please enter data first";
    else
      return "Enjoy!";
  }

  function ColorToDisplay(length)
  {
    if(length >0)
      return "green";
    else
      return "red";
  }

})();
