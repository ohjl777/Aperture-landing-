export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[11px] tracking-widest text-muted/70 sm:flex-row">
        <span>© {new Date().getFullYear()} APERTURE STUDIOS</span>
        <span>SHOT ON APERTURE OS</span>
      </div>
    </footer>
  );
}
