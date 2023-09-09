import { PropsWithChildren, ComponentProps } from "react";
import cx from "clsx";

export const WrapperCard: React.FC<
  PropsWithChildren & ComponentProps<"div">
> = ({ children, className, ...props }) => (
  <div
    className={cx(
      "p-[40px] flex flex-col rounded-[24px] border-dashed border-[1px] border-[#DCDEE0] bg-white",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// export default Card;
