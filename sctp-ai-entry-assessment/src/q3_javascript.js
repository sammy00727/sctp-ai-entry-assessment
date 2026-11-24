// Question 3 - String Manipulation
// Topic: Name Formatting Utility

// Helper: capitalise a word, e.g. "bOB" → "Bob".
// The expected output "Lim, Bob" (from "bob", "lim") shows names
// must be capitalised, so both functions below can reuse this.
function capitalise(word) {
    // trim() removes accidental spaces at the start or end
    const clean = word.trim();
    // First letter in uppercase + the rest of the word in lowercase
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
}


// Task 1:
// Write a function called formatName(firstName, lastName) that accepts two strings
// and returns a formatted string in this format: "lastName, firstName"
// Example: formatName("John", "Smith") → "Smith, John"

function formatName(firstName, lastName) {
    // Template literal joins the parts in "Last, First" order
    return `${capitalise(lastName)}, ${capitalise(firstName)}`;
}


// Task 2:
// Write a function called formatInitials(firstName, lastName) that returns the
// initials of the person as a string in uppercase.
// Example: formatInitials("john", "smith") → "J.S."
// Note: your function should handle inputs in any case (upper, lower, or mixed)
// and always produce properly capitalised output.

function formatInitials(firstName, lastName) {
    // Take the first character of each name (after trimming) and uppercase it
    const firstInitial = firstName.trim().charAt(0).toUpperCase();
    const lastInitial = lastName.trim().charAt(0).toUpperCase();
    return `${firstInitial}.${lastInitial}.`;
}


// Task 3:
// Call both functions with the following inputs and print each result:
//   formatName("Alice", "Tan")    → Expected: "Tan, Alice"
//   formatName("bob", "lim")      → Expected: "Lim, Bob"
//   formatInitials("Alice","Tan") → Expected: "A.T."
//   formatInitials("bob","lim")   → Expected: "B.L."

console.log(formatName("Alice", "Tan"));     // Tan, Alice
console.log(formatName("bob", "lim"));       // Lim, Bob
console.log(formatInitials("Alice", "Tan")); // A.T.
console.log(formatInitials("bob", "lim"));   // B.L.
