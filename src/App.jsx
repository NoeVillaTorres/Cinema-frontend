import { Toaster } from "sonner";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <AppRouter />

      <Toaster
      position="top-right"
      theme="dark"
      richColors
      closeButton
      />

    
  </>
  )
  
  

  
}