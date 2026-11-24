// Question 2 - Arrays and Loops
// Topic: Inventory Tracker
//
// Task 1:
// Declare an empty array called inventory to store item names as strings.

// const: the variable always points to the same array,
// but we can still add items to that array.
const inventory = [];


// Task 2:
// Write a function called addItem(itemName) that adds the given item to the
// inventory array. If the item already exists, print a message instead of adding it.
// Example message: "Mouse is already in inventory."

function addItem(itemName) {
    // includes() returns true if the item is already in the array
    if (inventory.includes(itemName)) {
        // Duplicate: warn instead of adding (template literal inserts the name)
        console.log(`${itemName} is already in inventory.`);
    } else {
        // New item: push() adds it to the end of the array
        inventory.push(itemName);
    }
}


// Task 3:
// Write a function called listInventory() that prints all items in the inventory.
// If the inventory is empty, print: "Inventory is empty."

function listInventory() {
    // An empty array has length 0
    if (inventory.length === 0) {
        console.log("Inventory is empty.");
    } else {
        // Passing the array to console.log prints it as [ 'Laptop', ... ]
        console.log("Inventory:", inventory);
    }
}


// Task 4:
// Call the functions in this order and observe the output:
addItem("Laptop");
addItem("Mouse");
addItem("Keyboard");
addItem("Mouse");   // Should trigger duplicate warning
listInventory();

// Expected output:
// Mouse is already in inventory.
// Inventory: [ 'Laptop', 'Mouse', 'Keyboard' ]
