type ButtonProps = {
  children: React.ReactNode;
  href?: string;
};

export default function Button({ children, href }: ButtonProps) {
  const className =
    "inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}