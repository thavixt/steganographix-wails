function isViewTransitionSupported(): boolean {
  const supportsAPI = typeof (document as any).startViewTransition === "function";
  const supportsCSS = CSS.supports('view-transition-name: header');
  const supportsFeature = supportsAPI && supportsCSS;

  const supportedBrowser = supportedBrowsers.some(key => key in navigator);
  const supported = supportsFeature && supportedBrowser;

  if (!supported) {
    console.warn('Current browser environment does not support ViewTransitions API', { supportsAPI, supportsCSS, supportedBrowser });
  }
  return supported;
}

// otherwise it's running in a native WebView window
const supportedBrowsers: string[] = [
  "brave",
  "chrome",
  "firefox",
  "edge",
]

export const VIEW_TRANSITION_SUPPORTED = isViewTransitionSupported();