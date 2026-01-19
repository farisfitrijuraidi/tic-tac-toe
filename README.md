# Tic-Tac-Toe

This is a browser-based implementation of the classic Tic-Tac-Toe game. This project was created as part of The Odin Project's JavaScript curriculum. The primary goal was to practice using Factory Functions, the Module Pattern, and IIFEs to minimize global scope and organize code effectively.

---

## Features
* **Modular Architecture**: The application is split into distinct modules (Gameboard, DisplayController, GameController) to strictly separate concerns between logic, data, and the DOM.
* **Console-Verified Logic**: The game logic (win conditions, ties, turn switching) is decoupled from the DOM, allowing it to be tested and verified purely via the browser console.
* **Smart State Management**: Prevents illegal moves (overwriting an existing spot) and "Zombie" clicks (clicking the board after the game has ended).
* **Dynamic Rendering**: The gameboard is rendered dynamically from a JavaScript array, ensuring the visual interface is always in sync with the internal data state.
* **Restart Functionality**: Users can reset the board and game state instantly without needing to refresh the page.

---

## What I Learned
This project was my first deep dive into structural design patterns in JavaScript. It challenged me to stop writing "spaghetti code" and start thinking about architecture.

Key takeaways include:
* **The Module Pattern & IIFEs**: I learned how to wrap code in Immediately Invoked Function Expressions (IIFEs) to create private scopes. This keeps the global namespace clean and prevents variables (like the `board` array) from being accessed or modified directly from the console.
* **Closures & Private State**: I utilized closures to protect the game state. Variables like `activePlayer` or `board` exist only inside their respective function scopes and are only accessible via specific public methods (e.g., `getBoard()`).
* **Separation of Concerns**: I practiced strict discipline in keeping the "Game Logic" separate from the "DOM Manipulation." The `Gameboard` module cares only about data, while the `DisplayController` cares only about the HTML.
* **Console-First Development**: I built the entire game engine in the console before writing a single line of DOM code. This taught me that a solid logic foundation makes adding a UI significantly easier.
* **Resolving Circular Dependencies**: I encountered issues where modules tried to reference each other before they were defined. I learned the importance of script execution order and reordered my modules to ensure `DisplayController` was initialized before `GameController` attempted to use it.

---

## Acknowledgements
* This project is based on the [Tic Tac Toe assignment](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) from The Odin Project.
* Fonts used: Roboto