import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import Footer from "@/components/app/footer"
import Header from "@/components/app/header"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/data"
import appCss from "@/styles/app.css?url"

const siteTitle = `${profile.name} | Portfolio`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: profile.tagline },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="ja" suppressHydrationWarning className="font-sans antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <Outlet />
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
