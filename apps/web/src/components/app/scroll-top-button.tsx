import { ChevronUp } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { scrollToSection } from "@/components/app/header"

export function ScrollTopButton() {
  return (
    <Button
      onClick={() => scrollToSection("hero")}
      size="icon"
      aria-label="Scroll to top"
      className="fixed right-8 bottom-8 rounded-full shadow-lg"
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  )
}
