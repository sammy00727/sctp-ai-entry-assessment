# Learning Notes – NTU SCTP AI Engineering Entry Assessment (JavaScript)

These notes explain every solution step by step so I can walk through the code at the interview.

---

## Question 1 – Temperature Converter (Functions & Conditionals)

### What it does
`convertTemp(value, unit)` converts Celsius ↔ Fahrenheit, returns `-1` for an unknown unit, and rounds to 2 decimal places.

### Step by step
1. `let result;` – declare a variable to hold the answer. `let` because it gets assigned later.
2. `if (unit === "C")` – `===` is **strict equality**: same value *and* same type, no conversion. Celsius → Fahrenheit: `(value * 9) / 5 + 32`.
3. `else if (unit === "F")` – Fahrenheit → Celsius: `((value - 32) * 5) / 9`. Brackets make sure the subtraction happens first.
4. `else { return -1; }` – any other unit is invalid. Returning early means the rounding line never runs. This is also why `convertTemp("invalid", "X")` is safe: the unit is checked before the value is used.
5. `Math.round(result * 100) / 100` – rounds to 2 decimals. Computers store decimals in binary, so `37 * 9 / 5 + 32` is actually `98.60000000000001`. Multiplying by 100, rounding to a whole number, then dividing by 100 gives `98.6`.

### Why `212` instead of `212.0`?
JavaScript has only one number type, so `212.0` and `212` are the same value and Node prints `212`. Python would print `212.0` because it separates floats from integers.

### Concepts used
Function declaration, parameters, return values, `if / else if / else`, strict equality, arithmetic and operator precedence, `Math.round`, floating‑point precision, early return.

### Expected output
```
212
0
98.6
-1
```

### Edge cases I tested
| Call | Result | Note |
|------|--------|------|
| `convertTemp(-40, "C")` | `-40` | −40 is the same in both scales |
| `convertTemp(0, "C")` | `32` | freezing point |
| `convertTemp(98.6, "F")` | `37` | reverse of the example |
| `convertTemp(50.5, "F")` | `10.28` | rounding to 2 dp (10.2777…) |
| `convertTemp(100, "c")` | `-1` | lowercase is treated as invalid; the brief says "C" or "F" exactly |

---

## Question 2 – Inventory Tracker (Arrays & Loops)

### What it does
Stores item names in an array, prevents duplicates, and prints the list.

### Step by step
1. `const inventory = [];` – an empty array. `const` means the variable can't be reassigned to a different array, but the array's contents can still change (`push` works).
2. `addItem(itemName)`:
   - `inventory.includes(itemName)` – returns `true` if the item is already in the array.
   - If true: print `` `${itemName} is already in inventory.` `` – a **template literal** (backticks) inserts the variable into the string.
   - Otherwise: `inventory.push(itemName)` adds it to the end.
3. `listInventory()`:
   - `inventory.length === 0` – an empty array has length 0, so print `"Inventory is empty."`.
   - Otherwise `console.log("Inventory:", inventory)` – passing the array as a second argument lets Node print it in the format `[ 'Laptop', 'Mouse', 'Keyboard' ]`, exactly as expected.
4. The calls at the bottom add Laptop, Mouse, Keyboard, then try Mouse again (duplicate warning), then list.

### Where's the loop?
`includes()` loops through the array for me internally. If asked to write it by hand:
```js
for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === itemName) { /* found it */ }
}
```
I could also print items one by one with `for (const item of inventory) { console.log(item); }`, but the expected output shows the whole array on one line, so I printed the array directly.

### Concepts used
Arrays, `const` vs `let`, `includes`, `push`, `length`, template literals, `if / else`, global state shared between functions.

### Expected output
```
Mouse is already in inventory.
Inventory: [ 'Laptop', 'Mouse', 'Keyboard' ]
```

### Edge cases I tested
- Calling `listInventory()` before adding anything prints `Inventory is empty.`
- Duplicate check is case-sensitive: `"mouse"` and `"Mouse"` count as different items (kept simple to match the brief).

---

## Question 3 – Name Formatting Utility (String Manipulation)

### What it does
`formatName` returns `"Last, First"` with proper capitalisation; `formatInitials` returns `"F.L."` in uppercase.

### Important detail
The expected output for `formatName("bob", "lim")` is `"Lim, Bob"`, not `"lim, bob"`. So the names must be capitalised, not just swapped.

### Step by step
1. Helper `capitalise(word)`:
   - `word.trim()` – removes spaces at the start/end.
   - `clean.charAt(0).toUpperCase()` – first letter in capitals.
   - `clean.slice(1).toLowerCase()` – everything from index 1 onwards in lowercase.
   - Join them with `+`. So `"bOB"` → `"B" + "ob"` → `"Bob"`.
   - I made it a separate function so the capitalising logic is written once and reused (DRY – Don't Repeat Yourself).
2. `formatName(firstName, lastName)` – `` `${capitalise(lastName)}, ${capitalise(firstName)}` `` puts the last name first with a comma and space.
3. `formatInitials(firstName, lastName)` – take `charAt(0)` of each trimmed name, uppercase it, and build `` `${firstInitial}.${lastInitial}.` ``.

### Concepts used
Helper functions, string methods (`trim`, `charAt`, `slice`, `toUpperCase`, `toLowerCase`), string indexes starting at 0, template literals, concatenation, code reuse.

### Expected output
```
Tan, Alice
Lim, Bob
A.T.
B.L.
```

### Edge cases I tested
| Call | Result |
|------|--------|
| `formatName("jOHN", "SMITH")` | `Smith, John` |
| `formatName(" amy ", "ng")` | `Ng, Amy` (spaces trimmed) |
| `formatInitials("john", "smith")` | `J.S.` |
| `formatInitials("MARY", "o'neil")` | `M.O.` |

Known limitation (fine for this brief): names like `"McDonald"` or `"van der Berg"` would become `"Mcdonald"` / `"Van der berg"`. Real-world name formatting is hard; I'd mention this rather than over-engineer the answer.

---

## Interview practice questions

**General**
1. *Walk me through your code.* → Use the step-by-step sections above, one question at a time.
2. *Why JavaScript?* → Prepare a personal answer (e.g. used it before, it runs everywhere – browser and Node – and is common in AI app front-ends and tooling).
3. *How did you use AI?* → Be honest: AI helped draft and review; I tested every program with Node, checked against expected outputs, tried edge cases, and can explain every line.
4. *How did you test it?* → Ran each file with `node`, compared output to the expected results, then tried extra inputs (negative temperatures, empty inventory, mixed-case names).

**Q1**
5. *What's the difference between `==` and `===`?* → `==` converts types before comparing (`"5" == 5` is true); `===` doesn't (`"5" === 5` is false). `===` is safer.
6. *Why does `37°C` need rounding?* → Floating-point: computers store decimals in binary, so the raw answer is `98.60000000000001`.
7. *Could you use `toFixed(2)`?* → Yes, but `toFixed` returns a **string** (`"98.60"`); the task wants a number, so `Math.round(x * 100) / 100` is better here.
8. *What if `value` isn't a number but the unit is "C"?* → JavaScript would return `NaN`. An improvement would be `if (typeof value !== "number") return -1;` – I kept to the spec.
9. *Would `switch` work instead of if/else?* → Yes: `switch (unit) { case "C": ...; case "F": ...; default: return -1; }`.

**Q2**
10. *Why `const` for an array you change?* → `const` stops reassignment of the variable, not changes inside the array.
11. *What would you use for faster lookups with many items?* → A `Set` – `set.has(item)` is constant-time and automatically rejects duplicates.
12. *How would you remove an item?* → `const i = inventory.indexOf(name); if (i !== -1) inventory.splice(i, 1);`
13. *Rewrite `includes` with a loop.* → See the `for` loop above.

**Q3**
14. *Are strings mutable in JavaScript?* → No. Methods like `toUpperCase()` return a **new** string; the original is unchanged.
15. *Difference between `slice` and `substring`?* → Mostly the same for positive indexes; `slice` also accepts negative indexes (counting from the end).
16. *What happens with an empty string?* → `capitalise("")` returns `""` and initials would be `".."` – could add a check if required.
17. *Why a helper function?* → Avoid repeating the same capitalisation logic, and make each function easier to read and test.

**Bigger picture**
18. *How would you add automated tests?* → Export the functions (`module.exports = { convertTemp }`) and use a test runner such as Node's built-in `node:test` or Jest with `assert.strictEqual`.
19. *What is Git and why commit?* → Version control: tracks changes, lets you go back and collaborate. A commit is a saved snapshot with a message (here, `Add solutions`).
