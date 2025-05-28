package main

import (
	"embed"
	"runtime"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := NewApp()

	AppMenu := menu.NewMenu()
	if runtime.GOOS == "darwin" {
		AppMenu.Append(menu.AppMenu())
	}

	FileMenu := AppMenu.AddSubmenu("File")
	FileMenu.AddText("Home", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		wailsRuntime.EventsEmit(app.ctx, "route", "home")
	})
	FileMenu.AddSeparator()
	FileMenu.AddText("Past processed images", keys.CmdOrCtrl("p"), func(_ *menu.CallbackData) {
		// Open appdata folder where common files are stored
		// @TODO
	})
	FileMenu.AddText("Past images with embedded data", keys.CmdOrCtrl("e"), func(_ *menu.CallbackData) {
		// Open appdata folder where common files are stored
		// @TODO
	})
	FileMenu.AddSeparator()
	FileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		wailsRuntime.Quit(app.ctx)
	})

	ProcessesMenu := AppMenu.AddSubmenu("Processes")
	ProcessesMenu.AddText("Image from image", keys.CmdOrCtrl("i"), func(_ *menu.CallbackData) {
		wailsRuntime.EventsEmit(app.ctx, "route", "image2image")
	})
	ProcessesMenu.AddText("Text from image", keys.CmdOrCtrl("t"), func(_ *menu.CallbackData) {
		wailsRuntime.EventsEmit(app.ctx, "route", "image2text")
	})

	AboutMenu := AppMenu.AddSubmenu("About")
	AboutMenu.AddText("What is steganography?", keys.CmdOrCtrl("a"), func(_ *menu.CallbackData) {
		wailsRuntime.BrowserOpenURL(app.ctx, "https://en.wikipedia.org/wiki/Steganography")
	})
	AboutMenu.AddText("How does this application work?", keys.CmdOrCtrl("h"), func(_ *menu.CallbackData) {
		wailsRuntime.EventsEmit(app.ctx, "route", "about")
	})
	AboutMenu.AddSeparator()
	AboutMenu.AddText("Made by @thavixt on GitHub", keys.CmdOrCtrl("g"), func(_ *menu.CallbackData) {
		wailsRuntime.BrowserOpenURL(app.ctx, "https://github.com/thavixt")
	})

	if runtime.GOOS == "darwin" {
		AppMenu.Append(menu.EditMenu())
	}

	// Create application with options
	err := wails.Run(&options.App{
		Title:     "Steganographix",
		Width:     1024,
		Height:    768,
		MinWidth:  400,
		MinHeight: 500,
		// Frameless:  true,
		Menu: AppMenu,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup:     app.startup,
		OnShutdown:    app.shutdown,
		OnBeforeClose: app.beforeclose,
		OnDomReady:    app.ondomready,
		Bind: []interface{}{
			app,
		},
		LogLevel: logger.ERROR,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
