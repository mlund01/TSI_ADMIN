angular.module('orderCloud-orderSvc', [])
    .factory('OrderSvc', OrderService);

function OrderService() {
    var _orderID = Math.floor(Math.random()*10000);
    var _lineItemID = Math.floor(Math.random()*10000) + 10000;

    return {
        orderID : _orderID,
        lineItemID : _lineItemID
    }
}