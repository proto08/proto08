import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Made with ❤️ using{' '}
          <Link
            href="https://nextjs.org"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Next.js
          </Link>
          {' & '}
          <Link
            href="https://ui.shadcn.com"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            shadcn/ui
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Source code available on{' '}
          <Link
            href="https://github.com/proto08/proto08"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  )
}
