## Properties Package

Loads exported properties from a CommonJS module and adds them to a design doc, optionally proxying list, show and update functions so they maintain the scope of the original module.

### Install

Add `properties` to your dependencies section in `kanso.json`.

```javascript
...
  "dependencies": {
    "properties": null,
    ...
  }
```

Run `kanso install` to fetch the package.