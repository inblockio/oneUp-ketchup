pragma solidity ^0.4.18;

contract TomatoesMarket {

  struct Vehicle {
    address vehicleAddress;
  }

  struct Storage {
    address storageAddress;
  }

  struct Crate {
    uint crateId;
    address farmer;
    uint amount;
    uint quality;
    uint harvestTimeStamp;
  }

  struct Order {
    uint orderId;
    uint crateId;
    address source;
    address destination;
    OrderState state;
    address carrier;
  }

  //                00        01          02
	enum OrderState { Placed, Executing, Completed}

  //List of vehicle
  mapping(address => Vehicle) public vehicles;

  //List of storages
  mapping(address => Storage) public storages;

  //List of crates
  uint public lastCrateId;
  mapping(uint => Crate) crates;

  //List of orders
  uint public lastOrderId;
  mapping(uint => Order) orders;

  //Events
  event LogNewOrder(uint orderId, uint crateId, address source, address destination, OrderState state);
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

  function addCrate(address farmer, uint amount, uint quality, uint harvestTime) public {
    lastCrateId++;
    crates[lastCrateId] = Crate(lastCrateId, farmer, amount, quality, harvestTime);
  }

  function newOrder(uint crateId, address source, address destination) public {
    lastOrderId++;
    orders[lastOrderId] = Order(lastOrderId, crateId, source, destination, OrderState.Placed, address(0));
    LogNewOrder(lastOrderId, crateId, source, destination, OrderState.Placed);
  }

  function getOrder(uint id) public view returns(uint orderId, uint crateId, address source, address destination, OrderState state, address carrier) {
    Order storage order = orders[id];
    return (order.orderId, order.crateId, order.source, order.destination, order.state, order.carrier);
  }

  function executeOrder(uint orderId, address carrier) public {
    Order storage order = orders[orderId];
    require(order.state == OrderState.Placed);
    order.state = OrderState.Executing;
    order.carrier = carrier;
    LogExecutingOrder(orderId, carrier);
  }

  function completeOrder(uint orderId) public {
    Order storage order = orders[orderId];
    require(order.state == OrderState.Executing);
    order.state = OrderState.Completed;
    LogCompletedOrder(orderId);
  }
}