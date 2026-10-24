export default function HelpPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Help</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">Ask us</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Size, cloth, a campus order. The note stays on this demo shop — nothing is emailed, and nothing is charged.
      </p>
      <form id="contact-form" className="mt-8 grid gap-4" action="/api/contact" method="post" data-testid="contact-form" noValidate>
        <label className="text-sm font-medium">
          Name
          <input name="name" autoComplete="name" className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal" />
        </label>
        <label className="text-sm font-medium">
          Email
          <input type="email" name="email" autoComplete="email" className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal" />
        </label>
        <label className="text-sm font-medium">
          What do you need?
          <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal" />
        </label>
        <button type="submit" id="send-message" data-testid="send-message" className="rounded-full bg-ink py-3 text-sm font-semibold text-card">
          Send message
        </button>
      </form>
    </div>
  );
}
