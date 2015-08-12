angular.module('orderCloud.productList')
    .controller('prodListCtrl', ProductListController);

function ProductListController(Categories, Products, $q) {
    var vm = this;
    vm.categoryID = 'softwareProducts';
    vm.activeCategory = activeCategory;
    vm.deleteProduct = deleteProduct;
    vm.modifyProduct = modifyProduct;
    vm.addProduct = addProduct;
    getProducts();

    function activeCategory(category) {
        if (category == 'all') {
            vm.categoryID = null;
        } else {
            vm.categoryID = category;
        }
        getProducts();

    }

    function deleteProduct(productID) {
        Products.Delete(productID)
            .then(Categories.DeleteProductAssignments('B1', vm.categoryID, productID)
                .then(function(data) {
                    getProducts()
                }))
    }

    function modifyProduct(product, productMod) {
        Products.Patch(product.ID, productMod)
            .then(function(data) {
                getProducts();
            })
    }

    function addProduct(product) {
        product.ID = Math.floor(Math.random()*100000);
        product.QuantityMultiplier = 1;
        product.Type = 'static';
        product.StdOrders = true;

        Products.Create(product)
            .then(function(data) {
                Categories.SaveProductAssignments('B1', {CategoryID: vm.categoryID, ProductID: data.ID, ListOrder: null})
                    .then(function(data) {
                        getProducts()
                    })
            })
    }



    function getProducts() {
        vm.Products = [];

        if (vm.categoryID == null) {
            return
        } else {
            Categories.ListProductAssignments('B1', vm.categoryID, null, 1, 20)
                .then(function(data) {
                    var items = data.Items;
                    for (var i = 0; i < items.length; i++) {
                        Products.Get(items[i].ProductID)
                            .then(function (prodData) {
                                vm.Products.push(prodData);
                            })
                    }
                });
        }
    }

    function getAllProducts(list) {
        var dfd = $q.defer();
        var finishCount = 0;
        var outputList = [];
        list.forEach(function(each) {
            Products.Get(each.productID)
                .then(function(data) {
                    finishCount++;
                    outputList.push(data);
                    if (finishCount == list.length) {
                        dfd.resolve(outputList);
                    }
                })
        })

        return dfd.promise;

    }
}
