# A go app made with wails

- https://wails.io/docs/gettingstarted/installation

> If you are using latest Linux version (example: Ubuntu 24.04) and it is not supporting libwebkit2gtk-4.0-dev, then you might encounter an issue in wails doctor: libwebkit not found. To resolve this issue you can install libwebkit2gtk-4.1-dev and during your build use the tag -tags webkit2_41.
Optionű

## About

This was made with the official Wails React-TS template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

```bash
wails dev -tags webkit2_41
```

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

```bash
wails build -tags webkit2_41
```

To build a redistributable, production mode package, use `wails build`.
