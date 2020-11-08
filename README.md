# Your-note

To see the application in action click [here.](https://your-note-5aadc.web.app/ "Your-note")

**"Your-note"** is a SPA application for creating notes.
Each **_note has a title and task list_** (todo list), then - Todo.
Each item of the Todo consists of a checkbox and the text signature associated with it.

In the application, you can switch between **_light_** and **_dark themes_**.

The application consists of 3 pages:

- home page;
- a page of creating/editing a note;
- login page.

**The main page** displays the list of all notes.
For each note, you will see a title and a list of tasks shortened to two items without the possibility to mark their execution.

**_Actions on the main page:_**

- proceed to creation of a new note;
- proceed to the change;
- delete (confirmation is required);
- sorting of notes (newest, oldest).

**The note editing page** allows you to create a new note or edit an existing note.

**_Actions with note:_**

- edit title of the note,
- undo the change made;
- repeat the undone change;
- cancel all the changes you have made (confirmation is required);
- save;
- delete (confirmation is required).

**_Actions with Todo points:_**

- add;
- delete;
- edit text;
- undo the change you made;
- repeat the undone change;
- mark as done;
- sorting of Todos (newest, oldest, done, in progress).

**The authorization page** allows a user to register or log in.

**_Actions on the login page:_**

- enter Email, validate it;
- enter a password, validate it;
- login;
- sign up.

### Storage

You can work in the application even without registration. In this case, notes are stored in **_LocalStorage_**.
After user authorization, the application starts working with **_Firebase Realtime Database_**, saving information to the server. Each authorized user has access only to his own notes.

### The following technical means were used in the development

- HTML/SCSS/JavaScript
- React (Hooks)
- Redux/redux-thunk
- Fetch API
- Webpack
- Firebase
- LocalStorage

The application is adaptive for different screen resolutions. Supports IE11 (only light theme).
Deployed on Firebase Hosting.
This project was bootstrapped with Create React App.
