### DISCLAIMER: 
This solution has only been tested on Windows machines. Windows 10 and Windows 11 are confirmed to be compatible following the instructions below.

### DEPENDENCIES:
- NodeJS (for NPM)
- ~~- Chai, Mocha and Spectron for unit testing~~
- Jest and ts-Jest for unit testing
- ElectronJS development environment if you want to edit the files and package them

### INSTRUCTIONS TO RUN
1. Click the green code button and select "Download as ZIP" to obtain all necessary files and folders.
2. Extract the contents of the zip file and place the folder "hope-main" wherever you desire.
3. Install NPM by following this guide: [How to Install NPM and Node.js on Mac and Windows](https://positiwise.com/blog/how-to-install-npm-and-node-js-on-mac-and-windows).
4. Open Command Prompt (CMD) as administrator by typing "cmd" into the Windows search bar typically located at the bottom of your screen.
5. In CMD, type `npm -v` to verify that NPM is correctly installed.
6. After confirmation, navigate to the "hope-main" folder and double-click the address bar to copy the address (e.g., "C:\Users\username\Desktop\hope-main").
7. Return to CMD and type `npm install`, then type `npm install electron-builder --save-dev`.
8. Finally, execute `npm run dist` which should generate all necessary binaries and provide you with an installer.
9. Navigate back to the "hope-main" folder, open the "dist" folder, and locate the ".exe" file named "ProGM Setup 1.0.0.exe".
10. Double-click the executable to run it, allowing you to install ProGM anywhere on your Windows computer and run it.

### USEFUL COMMANDS
- To run the program, use "npm start" from the terminal.
- To run program tests, utilize "npm test," which will execute all files ending in ".mjs". For additional details, refer to the package.json file.
- To modify the program GUI, you can either delve into the code or simply run the program with "npm start" and use the shortcut "Ctrl+LShift+I" to open the dev tools
  and you can select variables and GUI icons and adjust them from there
