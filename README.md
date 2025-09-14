# Bookmarker

A simple Angular app to manage bookmarks. Built with **Angular, NgRx, Rxjs, Angular Material, and JSON Server**.

## Table of Contents
- [Features](#features)
- [Setup](#setup)
  - [Install](#install)
  - [Mock Backend (JSON Server)](#mock-backend-json-server)
  - [Run App](#run-app)
  - [Testing](#testing)
- [Stack](#stack)

---

## Features
- Add, edit, and delete bookmarks
- Search and filter in real time
- Group by categories
- State managed with NgRx
- Material UI components

---

## Setup

### Install
```
git clone https://github.com/your-username/bookmarker.git
cd bookmarker
npm install
```

### Mock Backend (JSON Server)
```
npm install -g json-server
json-server --watch db.json --port 3000
```

Runs at: [http://localhost:3000/bookmarks](http://localhost:3000/bookmarks)

### Run App
```
ng serve
```

Open in browser: [http://localhost:4200](http://localhost:4200)
### Testing
```
ng test
```

Partial coverage

---

## Stack
- Angular + NgRx
- Angular Material
- JSON Server (mock API)


