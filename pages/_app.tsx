import type { AppProps } from "next/app"
import { SnackbarProvider } from "notistack"
import { useEffect } from "react"
import { RecoilRoot, useRecoilSnapshot } from "recoil"
import "../styles/globals.css"

function DebugObserver(): any {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    console.debug("The following atoms were modified:")
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default MyApp
