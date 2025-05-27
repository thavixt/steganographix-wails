import { createContext, useContext, useState } from "react";

export interface WailsContext {
  initialized: boolean;
}

export const WailsContext = createContext<WailsContext>({
  initialized: false,
})

export function useWailsContext() {
  const context = useContext(WailsContext);
  const [initialized, setInitialized] = useState(context.initialized);

  return {
    ...context,
    initialized,
    setInitialized: (initialized: true) => setInitialized(initialized),
  };
}