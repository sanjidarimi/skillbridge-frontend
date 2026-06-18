"use client"
export default function FooterNewsletters() {
  return (
    <>
      <div className="md:col-span-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Stay Updated
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Get practical learning advice and platform updates delivered straight
          to your inbox.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 max-w-sm pt-1"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-3 py-2 bg-background border border-border text-xs sm:text-sm rounded-md text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            aria-label="Email address for updates"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
}
