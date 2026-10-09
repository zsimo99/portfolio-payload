import React from 'react'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground transition-colors">
      <div className="container max-w-5xl py-8 flex items-center justify-center text-center">
        <p className="text-xs text-muted-foreground font-mono tracking-tight">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
