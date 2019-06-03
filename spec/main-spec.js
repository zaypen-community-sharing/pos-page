describe('pos', function () {
  var allItems;
  var inputs;
  var outputs;

  var cartItems = [
    {
      name: '羽毛球',
      count: 5,
      unit: '个',
      price: 1.00,
      totalPrice: 4.00,
      img: './imgs/badminton.png'
    },
    {
      name: '苹果',
      count: 2,
      unit: '斤',
      price: 5.50,
      totalPrice: 11.00,
      img: './imgs/apple.jpeg'
    },
    {
      name: '可口可乐',
      count: 3,
      unit: '瓶',
      price: 3.00,
      totalPrice: 6.00,
      img: './imgs/coco-cola.jpg'
    }
  ]

  var discountProductList = [
    {name: '羽毛球', count: 1, unit: '个', price: 1.00},
    {name: '可口可乐', count: 1, unit: '瓶', price: 3.00}
  ]

  var summary = {
    totalPrice: 21.00,
    discountPrice: 4.00
  }

  var expectResult = {
    cartItems: cartItems,
    discountProductList: discountProductList,
    summary: summary
  }

  beforeEach(function () {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    outputs = generateOutputs(inputs)
  });

  it('should return correct cartItems list', function () {
    expect(outputs.cartItems).toEqual(expectResult.cartItems)
  });

  it('should return correct discounted product list', function () {
    expect(outputs.discountProductList).toEqual(expectResult.discountProductList)
  });

  it('should return correct summary', function () {
    expect(outputs.summary).toEqual(expectResult.summary)
  });

  it('should return correct data structure', function () {
    expect(outputs).toEqual(expectResult)
  });
});
