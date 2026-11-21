import { cn } from "cn";
import { Container } from "@/components/layout/container";

/** Exactly 2 or 3 values — the only table widths this component supports. */
type TableTuple<T> = [T, T] | [T, T, T];

type BlogTableProps = {
  /** Header labels, left to right. */
  columns: TableTuple<string>;
  /** One tuple of cell texts per body row. */
  rows: Array<TableTuple<string>>;
  /** Column ratios, e.g. ["1/2", "1/4", "1/4"]. Defaults to equal widths. */
  columnWidths?: TableTuple<string>;
  title?: string;
  description?: string;
  /** Optional note rendered directly under the table. */
  caption?: string;
};

const headingClassName =
  "font-gilroy text-[24px] leading-[120%] font-bold tracking-[0.02em] text-black max-[390px]:text-[16px] sm:text-[26px] md:text-[28px] lg:text-[32px]";

const descriptionClassName =
  "font-inter text-[14px] leading-[140%] font-normal tracking-normal text-black max-[390px]:text-[12px] sm:text-[15px] lg:text-[16px]";

const cellClassName =
  "break-words border border-[#111111] px-[16px] py-[12px] text-left align-top font-inter text-[13px] leading-[140%] tracking-normal text-[#111111] max-[390px]:px-2 max-[390px]:py-1.5 max-[390px]:text-[16px] sm:px-[24px] sm:py-[16px] sm:text-[14px] md:px-[32px] md:py-[18px] md:text-[15px] lg:px-[40px] lg:py-[20px] lg:text-[16px]";

/** "w-1/2" / "1/2" -> "calc(100% * 1/2)". Plain CSS widths pass through. */
function resolveColumnWidth(
  value: string | undefined,
  columnCount: number,
): string {
  const ratio = value?.trim().replace(/^w-/, "") ?? `1/${columnCount}`;

  if (/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(ratio)) {
    return `calc(100% * ${ratio.replace(/\s/g, "")})`;
  }

  return ratio || `calc(100% * 1/${columnCount})`;
}

function BlogTable({
  columns,
  rows,
  columnWidths,
  title,
  description,
  caption,
}: BlogTableProps) {
  const columnCount = columns.length;

  return (
    <Container
      bgColor="white"
      height="auto"
      className="pb-[48px] sm:pb-[56px] md:pb-[64px] lg:pb-[72px] xl:pb-[76px] 2xl:pb-[80px] max-[390px]:pb-8"
    >
      {title && (
        <h2 className={headingClassName}>
          {title}
        </h2>
      )}

      {description && (
        <p className={cn(descriptionClassName, "mt-[12px] max-[390px]:mt-2")}>
          {description}
        </p>
      )}

      <figure className="mt-[24px] sm:mt-[32px] md:mt-[40px] max-[390px]:mt-3">
        <div className="w-full overflow-x-auto">
          <table
            className={cn(
              "w-full table-fixed border-collapse border border-[#111111]",
              columnCount === 3 && "min-w-[640px] sm:min-w-0",
            )}
          >
            <colgroup>
              {columns.map((_, index) => (
                <col
                  key={index}
                  style={{
                    width: resolveColumnWidth(columnWidths?.[index], columnCount),
                  }}
                />
              ))}
            </colgroup>

            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={`${column}-${index}`}
                    scope="col"
                    className={cn(
                      cellClassName,
                      "font-bold",
                      index === 0 ? "bg-[#00B5A4]" : "bg-[#00B5A433]",
                    )}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, columnIndex) =>
                    columnIndex === 0 ? (
                      <th
                        key={columnIndex}
                        scope="row"
                        className={cn(
                          cellClassName,
                          "bg-[#00B5A433] font-bold",
                        )}
                      >
                        {row[columnIndex] ?? ""}
                      </th>
                    ) : (
                      <td
                        key={columnIndex}
                        className={cn(cellClassName, "bg-white")}
                      >
                        {row[columnIndex] ?? ""}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {caption && (
          <figcaption
            className={cn(
              descriptionClassName,
              "mt-[24px] sm:mt-[32px] md:mt-[40px] max-[390px]:mt-3",
            )}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </Container>
  );
}

export { BlogTable };
