import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto flex items-center justify-center">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    </main>
  )
}
