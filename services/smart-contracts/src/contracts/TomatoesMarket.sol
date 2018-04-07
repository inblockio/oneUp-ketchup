pragma solidity ^0.4.18;

contract TomatoesMarket {

  struct Vehicle {
    address vehicleAddress;
  }

  struct Storage {
    address storageAddress;
  }

  struct Order {
    address source;
    address destination;
    uint amount;
    uint price;
    OrderState state;
    address carrier;
    //time stamp?    
  }

  //                00        01          02
	enum OrderState { Placed, Executing, Completed}

  //List of vehicle
  mapping(address => Vehicle) public vehicles;

  //List of storages
  mapping(address => Storage) public storages;

  //List of orders
  uint public lastOrderId;
  mapping(uint => Order) orders;

  //Events
  event LogNewOrder(uint orderId, address source, address destination, uint amount, uint price);
  event LogExecutingOrder(uint orderId, address carrier);
  event LogCompletedOrder(uint orderId);

  //Constructor
  function TomatoesMarket() public {

  }

  function addVehicle(address vehicleAddress) public {
    vehicles[vehicleAddress] = Vehicle(vehicleAddress);
  }

  function addStorage(address storageAddress) public {
    storages[storageAddress] = Storage(storageAddress);
  }

  function newOrder(address source, address destination, uint amount, uint price) public {
    orders[lastOrderId++] = Order(source, destination, amount, price, OrderState.Placed, address(0));
    LogNewOrder(lastOrderId, source, destination, amount, price);
  }

  function executeOrder(uint orderId, address carrier) public {
    orders[orderId].state = OrderState.Executing;
    orders[orderId].carrier = carrier;
    LogExecutingOrder(orderId, carrier);
  }

  function completeOrder(uint orderId) public {
    orders[orderId].state = OrderState.Completed;
    LogCompletedOrder(orderId);
  }
}