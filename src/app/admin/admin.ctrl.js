angular.module('orderCloud.admin')
    .controller('adminCtrl', AdminController);

function AdminController(Me, Orders, LineItems, Products) {
    var vm = this;
    showList();
    vm.orderList = [];
    Me.Get()
        .then(function(data) {
            vm.user = data;
        });

    function showList() {
        Orders.List('Outgoing','B1', 'unsubmitted')
            .then(function(data) {
                vm.order = data.Items[0];
                vm.orderID = data.Items[0].ID;

                LineItems.List('B1', vm.orderID)
                    .then(function(data) {
                        data.Items.forEach(function(each) {
                            Products.Get(each.ProductID)
                                .then(function(product) {
                                    product.LineItemID = each.ID;
                                    vm.orderList.push(product);
                                })
                        })
                    })
            })
    }
}