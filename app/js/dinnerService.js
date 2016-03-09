// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberofguests = 1;

  this.dishesselected = [];

  this.category = [];


  this.getNumberOfGuests = function(){
    return numberofguests;
  }

  this.setNumberOfGuests = function(num) {
    numberofguests = num;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    var filter;
    listofitems = this.getAllDishes(type, filter);
    for(key in listofitems){
      for(key2 in this.dishesselected){
        if (listofitems[key].id == this.dishesselected[key2]){
          return this.getDish(listofitems[key].id);       
        }
      }
    }
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    var fullmenu = [];
    for(key in this.dishesselected){
      this.getDish(this.dishesselected[key], function(menuitem, status){
        if(status == "success"){
          fullmenu = fullmenu.concat(menuitem);
        }else{
          fullmenu = status;
        }
      });
    }
    return fullmenu;
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var allingredients = [];
    for(key in this.dishesselected){
      menuitem = this.getDish(this.dishesselected[key], function(menuitem){
        allingredients = allingredients.concat(menuitem.Ingredients);
      });
    }
    return allingredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var allingredients = this.getAllIngredients();
    var totalPrice = 0;
    for(key in allingredients){
      totalPrice = allingredients[key].Quantity + totalPrice;
    }
    return totalPrice * numberofguests;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(id, cat) {
    var isExist = false;
    var catExist = false;
    var indexId = '';
    for(key in this.category){
      if (cat == this.category[key]){
        catExist = true;
        indexId = key;
      }
    }
    for(key in this.dishesselected){
      if (id == this.dishesselected[key]){
        isExist = true;
        indexId = key;
      }
    }
    if(catExist === false && isExist === false){
      this.category.push(cat);
      this.dishesselected.push(id);
    }else if (catExist === true && isExist === false){
      this.dishesselected.splice(indexId, 1);
      this.dishesselected.push(id);
    }else if (catExist === true && isExist === true){
      alert("This dish is already selected!");
    }
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(key in this.dishesselected){
      if (id == this.dishesselected[key]){
        this.dishesselected.splice(key, 1);
        this.category.splice(key, 1);
      }
    }
  }

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'H9n1zb6es492fj87OxDtZM9s5sb29rW3'});
  
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'H9n1zb6es492fj87OxDtZM9s5sb29rW3'}); 

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});