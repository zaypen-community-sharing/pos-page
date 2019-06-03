function createItemList(allItems, inputs) {
  var list = [];

  for (var i = 0; i < inputs.length; i++) {
    var location = inputs[i].length;

    if(inputs[i].length > 10){
      location = inputs[i].indexOf("-");
    }

    var barcode = inputs[i].substring(0, location)

    for (var k = 0; k < allItems.length; k++) {
      if (barcode === allItems[k].barcode) {
        var newItem = {
          name: allItems[k].name,
          unit: allItems[k].unit,
          price: allItems[k].price,
          barcode: allItems[k].barcode,
          img: allItems[k].img
        }

        list.push(newItem)
      }
    }
  }

  return list;
}

function createCartList(itemList, inputs) {
  var cartList = [];

  for (var i = 0; i < itemList.length; i++) {
     var count = 1;
    var isExist = false;

    if (inputs[i].length > 10) {
       count = parseInt(inputs[i].substring(inputs[i].indexOf('-') + 1));
     }

     for (var k = 0; k < cartList.length; k++) {
       if (cartList[k].barcode === itemList[i].barcode) {
         cartList[k].count += count;
         isExist = true;
       }
     }

     if (!isExist) {
       var temp = {
         name: itemList[i].name,
         unit: itemList[i].unit,
         price: itemList[i].price,
         img: itemList[i].img,
         count: count,
         barcode: itemList[i].barcode
       }
       cartList.push(temp);
     }
  }

  return cartList;
}

function caculateDiscount (cartList, promotions) {
  var promotion = promotions[0];
  var cartItems = [];
  var discountProductList = [];

  for (var m = 0; m < cartList.length; m++) {
    var savedCount = 0;

    for (var n = 0; n < promotion.barcodes.length; n++) {
      if (cartList[m].barcode === promotion.barcodes[n]) {
        savedCount = parseInt(cartList[m].count / 3);
        var discountItem = {
          name: cartList[m].name,
          count: savedCount,
          unit: cartList[m].unit,
          price: cartList[m].price
        };

        discountProductList.push(discountItem);
      }
    }

    var totalPrice = (cartList[m].count - savedCount) * cartList[m].price;

    var temp = {
      name: cartList[m].name,
      count: cartList[m].count,
      unit: cartList[m].unit,
      price: cartList[m].price,
      totalPrice: totalPrice,
      img: cartList[m].img
    }

    cartItems.push(temp);
  }

  return { cartItems: cartItems, discountProductList: discountProductList };
}

function createSummary (cartItems, discountProductList) {
  var totalPrice = 0;
  var discountPrice = 0;

  for (var i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].totalPrice;
  }

  for (var k = 0; k < discountProductList.length; k++) {
    discountPrice += (discountProductList[k].count * discountProductList[k].price);
  }

  return {
    totalPrice: totalPrice,
    discountPrice: discountPrice
  };
}

function generateOutputs(inputs) {
  // 获取全部的商品
  var allItems = loadAllItems();
  // 获取全部的促销信息
  var promotions = loadPromotions();

  var itemList = createItemList(allItems, inputs)

  var cartList = createCartList(itemList, inputs)

  var discountInfo = caculateDiscount(cartList, promotions)

  var summary = createSummary(discountInfo.cartItems, discountInfo.discountProductList);

  var result = {
    cartItems: discountInfo.cartItems,
    discountProductList: discountInfo.discountProductList,
    summary: summary
  }

  return result
}
