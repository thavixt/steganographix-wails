package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (b *App) startup(ctx context.Context) {
	b.ctx = ctx
	if wailsRuntime.Environment(ctx).BuildType == "dev" {
		// wailsRuntime.WindowMaximise(ctx)
		// wailsRuntime.WindowHide(ctx)
		// wailsRuntime.BrowserOpenURL(ctx, "http://127.0.0.1:34115")
	}
	wailsRuntime.EventsOn(ctx, "route", func(optionalData ...interface{}) {
		wailsRuntime.LogDebugf(ctx, "Route event: %v", optionalData...)
	})
}

func (b *App) ondomready(ctx context.Context) {}

func (b *App) beforeclose(ctx context.Context) bool {
	// true if it should prevent shutdown
	return false
}

func (b *App) shutdown(ctx context.Context) {}

func (a *App) Notify(message string) {
	// messageDialogOptions := wailsRuntime.MessageDialogOptions{
	// 	Title:   "Steganographix",
	// 	Message: message,
	// 	Type:    wailsRuntime.InfoDialog,
	// }
	// wailsRuntime.MessageDialog(a.ctx, messageDialogOptions)
	wailsRuntime.WindowShow(a.ctx)
}

func (a *App) NotifyError(message string) {
	// messageDialogOptions := wailsRuntime.MessageDialogOptions{
	// 	Title:   "Steganographix - Error",
	// 	Message: message,
	// 	Type:    wailsRuntime.ErrorDialog,
	// }
	// wailsRuntime.MessageDialog(a.ctx, messageDialogOptions)
	wailsRuntime.WindowShow(a.ctx)
}

// Steganographic function that extracts the 2 least-singificant bits of each byte in an image
// Receives an image:Uint8Array<ArrayBufferLike> parameter, width:number and height:number from JS
func (a *App) StegoExtract(imageData []byte, width int, height int) []byte {
	var extractedBytes []byte
	var currentByte byte
	var count int

	for _, b := range imageData {
		// Get the 2 LSBs
		twoBits := b & 0x03
		// Shift into position
		currentByte = (currentByte << 2) | twoBits
		count++
		if count == 4 {
			extractedBytes = append(extractedBytes, currentByte)
			currentByte = 0
			count = 0
		}
	}

	// If there are leftover bits, pad them on the right
	if count > 0 {
		currentByte = currentByte << (2 * (4 - count))
		extractedBytes = append(extractedBytes, currentByte)
	}

	return extractedBytes
}

type RandomImage struct {
	Message string
	Status  string
}

func (a *App) StegoEmbed() string {
	response, err := http.Get("https://dog.ceo/api/breeds/image/random")
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data RandomImage
	json.Unmarshal(responseData, &data)

	return data.Message
}
