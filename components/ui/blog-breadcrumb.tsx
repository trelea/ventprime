import { useTranslations } from "next-intl";
import { BlogBackLink } from "@/components/ui/blog-back-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { blogIndexPath, truncateTitle } from "@/lib/blogs";

type BlogBreadcrumbProps = {
  title: string;
};

function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  const tb = useTranslations("Blogs");
  const tNav = useTranslations("Nav");

  return (
    <div className="flex items-center gap-[8px] max-[390px]:gap-1.5">
      <BlogBackLink href={blogIndexPath} label={tb("back")} />
      <Breadcrumb>
        <BreadcrumbList className="font-gilroy text-[13px] leading-[120%] tracking-[0.02em] capitalize text-black sm:text-[14px] md:text-[15px] lg:text-[16px] max-[390px]:text-[12px]">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />} className="font-normal">
              {tb("home")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={blogIndexPath} />}
              className="font-normal"
            >
              {tNav("blog")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-black">
              {truncateTitle(title, 40)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export { BlogBreadcrumb };
