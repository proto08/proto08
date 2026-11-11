import { Link } from "@tanstack/react-router"
import { buttonVariants } from "@workspace/ui/components/button"

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <Link to="/" className={buttonVariants()}>
          Go to Home
        </Link>
      </div>
    </main>
  )
}
