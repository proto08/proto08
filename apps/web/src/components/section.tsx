export function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">{title}</h2>
      {children}
    </section>
  )
}
