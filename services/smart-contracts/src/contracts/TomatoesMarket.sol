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
  event LogNewOrder(uint orderId, uint crateId, address source, address destination);
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
    
  }

  function newOrder(uint crateId, address source, address destination, uint amount, uint quality) public {
    lastOrderId++;
    orders[lastOrderId] = Order(lastOrderId, crateId, source, destination, OrderState.Placed, address(0));
    LogNewOrder(lastOrderId, crateId, source, destination);
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