Edgewater Markets QA Assignment
===============================
5 Automated tests, written in TypeScript with Playwright, demonstrating access to https://www.thriftbooks.com/.

How to Install
--------------
With Node.js installed, from  the project directory run:

``npm install``

How to Run
----------
To run all the tests:

``npm test`` or ``npx playwright test``

To run a specific test by title:

``npx playwright test -g "Added book shows in cart"``

To open the last HTML report:

``npx playwright show-report``

Notes
-----
1. For demonstration purposes, slowmo and the tracer (viewable in the HTML report) have been enabled, and headless and parallel modes have been disabled.
2. Given the scope of the assignment and time frame, I kept all tests in one spec file and hardcoded the locators and test data. In a real project, the code would be encapsulated in page objects and helper classes, and locators and test data would live in separate files to improve readability and make code maintenance easier.
3. The acceptance criteria were decided for demonstration purposes. In a real project they would be fleshed out and decided with input from the whole team ideally.
4. Locator strategies would also be standardized in a real project. I decided to use whatever method was most convenient for the assignment.

Contact
-------
Salvatore Rosa

salrosa91@gmail.com

