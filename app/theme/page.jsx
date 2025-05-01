export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎨 ShadCN + Tailwind Theme Tokens</h1>

      <div className="space-y-4 text-sm font-medium">
        <div className="rounded p-4 border bg-background text-foreground">
          <p className="font-mono mb-1">
            className="bg-background text-foreground"
          </p>
          <p>
            This block uses <code>--background</code> and{" "}
            <code>--foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-foreground text-background">
          <p className="font-mono mb-1">
            className="bg-foreground text-background"
          </p>
          <p>
            This block uses <code>--foreground</code> and{" "}
            <code>--background</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-primary text-primary-foreground">
          <p className="font-mono mb-1">
            className="bg-primary text-primary-foreground"
          </p>
          <p>
            This block uses <code>--primary</code> and{" "}
            <code>--primary-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-secondary text-secondary-foreground">
          <p className="font-mono mb-1">
            className="bg-secondary text-secondary-foreground"
          </p>
          <p>
            This block uses <code>--secondary</code> and{" "}
            <code>--secondary-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-muted text-muted-foreground">
          <p className="font-mono mb-1">
            className="bg-muted text-muted-foreground"
          </p>
          <p>
            This block uses <code>--muted</code> and{" "}
            <code>--muted-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-accent text-accent-foreground">
          <p className="font-mono mb-1">
            className="bg-accent text-accent-foreground"
          </p>
          <p>
            This block uses <code>--accent</code> and{" "}
            <code>--accent-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-destructive text-destructive-foreground">
          <p className="font-mono mb-1">
            className="bg-destructive text-destructive-foreground"
          </p>
          <p>
            This block uses <code>--destructive</code> and{" "}
            <code>--destructive-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-card text-card-foreground">
          <p className="font-mono mb-1">
            className="bg-card text-card-foreground"
          </p>
          <p>
            This block uses <code>--card</code> and{" "}
            <code>--card-foreground</code>
          </p>
        </div>

        <div className="rounded p-4 border bg-popover text-popover-foreground">
          <p className="font-mono mb-1">
            className="bg-popover text-popover-foreground"
          </p>
          <p>
            This block uses <code>--popover</code> and{" "}
            <code>--popover-foreground</code>
          </p>
        </div>
      </div>
    </div>
  );
}
