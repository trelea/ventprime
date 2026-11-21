import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedPath } from "@/i18n/routing";

type BlogBackLinkProps = {
  href: LocalizedPath;
  label: string;
};

/** Small left-arrow link placed before a breadcrumb. */
function BlogBackLink({ href, label }: BlogBackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-[6px] text-black transition-colors hover:text-primary max-[390px]:size-5"
    >
      <ArrowLeft
        aria-hidden="true"
        className="size-[15px] max-[390px]:size-3.5"
      />
    </Link>
  );
}

export { BlogBackLink };
