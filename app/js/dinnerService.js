// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($q, $resource, $cookieStore) {
  
  $cookieStore.put("numberofguests", 1);

  if("undefined" === typeof ($cookieStore.get("category"))){
    $cookieStore.put("category", []);
  }
  if("undefined" === typeof ($cookieStore.get("dishesselected"))){
    $cookieStore.put("dishesselected", []);
  }

  this.category = $cookieStore.get("category");
  this.dishesselected = $cookieStore.get("dishesselected");

  this.getNumberOfGuests = function(){
    return $cookieStore.get("numberofguests");
  }

  this.setNumberOfGuests = function(num) {
    $cookieStore.put("numberofguests", num);
  }

  //Returns the dish that is on the menu for selected type 
  // this.getSelectedDish = function(type) {
  //   var filter;
  //   listofitems = this.getAllDishes(type, filter);
  //   for(key in listofitems){
  //     for(key2 in this.dishesselected){
  //       if (listofitems[key].id == this.dishesselected[key2]){
  //         return this.getDish(listofitems[key].id);       
  //       }
  //     }
  //   }
  // }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    var fullmenu = [];
    for(key in this.dishesselected){
      item = this.Dish.get({id:this.dishesselected[key]}, function(menuitem){
        return menuitem;
      }, function(menuitem){
        return menuitem.Message;
      });
      fullmenu.push(item);
    }
    return fullmenu;    
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var allingredients = [];
    for(key in this.dishesselected){
      menuitem = this.Dish.get({id:this.dishesselected[key]}, function(menuitem){
        return menuitem
      });
      ingre = menuitem.$promise.then(function(dish){
        return dish.Ingredients;
      });
      allingredients.push(ingre);
    }
    return allingredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var allingredients = this.getAllIngredients();
    var totalPrice = $q.defer();
    var self = this;
    $q.all(allingredients).then(function(allingre){
      var tot = 0;
      for(key in allingre){
        ingre=allingre[key];
        var a = 0;
        for(i=0; i<ingre.length; i++){
          a = a + ingre[i].MetricQuantity;
        }
        tot = tot + a;
      }
      totalPrice.resolve(tot*self.getNumberOfGuests());
    });
    return totalPrice;
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
      $cookieStore.put("category", this.category);
      $cookieStore.put("dishesselected", this.dishesselected);
    }else if (catExist === true && isExist === false){
      this.dishesselected.splice(indexId, 1);
      this.dishesselected.push(id);
      $cookieStore.put("dishesselected", this.dishesselected);
    }else if (catExist === true && isExist === true){
      alert("This dish is already selected!");
    }
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(key in this.dishesselected){
      if (id == this.dishesselected[key]){
        cat=this.category[key];
        this.dishesselected.splice(key, 1);
        this.category.splice(key, 1);
        $cookieStore.put("category", this.category);
        $cookieStore.put("dishesselected", this.dishesselected);
      }
    }
  }
  // Get the results of a search
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'H9n1zb6es492fj87OxDtZM9s5sb29rW3'},{get:{method:"GET",cache:true}});
  // Get a dish with a specific id
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'H9n1zb6es492fj87OxDtZM9s5sb29rW3'},{get:{method:"GET",cache:true}}); 

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