# AngularJS Session Manager

AngularJS module to make browser's LocalStorage act like SessionStorage.  
It clears the browser localstorage when user leaves the last tab of your website.

## Usage

Without prefix:

```javascript
app.run(function (sessionManager) {
    sessionManager.start();
});
```

With prefix:

```javascript
app.run(function (sessionManager) {
    sessionManager.start('example_');
});
```

If prfix is defined, only localStorage items with that prefix will be removed.  
Otherwise, localStorage will be completely cleared.
