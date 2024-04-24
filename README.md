### PROJECT DESCRIPTION
ProGM is a note-taking program that helps game masters develop their stories through concatenation of story events in a unique way. This unique way is through a branching path GUI where the user can make events
give those events titles, descriptions amongst other relevant information and stores that information into an event list. From the event list can view their events and their information and when they decide the want to
add an event to their story they can start by clicking the "+" icon which creates an event card that the user can attach an event from the event list into. That is not all! If your party is fooling around too much? If so, you can visit the scenario menu to select a scenario that forces the party to get back into the story (limited amount for now, will be updated in the future!). Selecting a scene will append it to the current event card to suplement your event.

Future work:
Progress tracker
Character tracker
Search functions
Hot keys
GUI improvements (styles and buttons)
Expanded utility in terms of event details 

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
