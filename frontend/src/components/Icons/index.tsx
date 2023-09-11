//ALL icons are from https://iconify.design/
import { ComponentProps } from "react";
import cx from "clsx";

interface IconProps extends ComponentProps<"svg"> {
  iconClassName?: string;
  className?: string;
}

export const QuestionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.97 8.265a1.45 1.45 0 0 0-.487.57a.75.75 0 0 1-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 0 1 1.004 2.006c0 1.033-.513 1.72-1.027 2.215c-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 0 0-.435.409v1.37a.75.75 0 1 1-1.5 0v-1.473c0-.237.067-.504.247-.736c.22-.28.486-.517.718-.714l.183-.153l.001-.001c.172-.143.324-.27.47-.412c.368-.355.569-.676.569-1.136a.953.953 0 0 0-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265ZM13 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
    />
    <path
      fill="currentColor"
      d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5A9.5 9.5 0 0 0 2.5 12Z"
    />
  </svg>
);

export const CheckedIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      className={props?.className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 7.7065L6 10.207L10.5 5.7075L9.7925 5L6 8.793L4.2065 7L3.5 7.7065Z"
        fill="#1E8E3E"
      />
      <path
        d="M3.11101 1.67971C4.26216 0.910543 5.61553 0.5 7 0.5C8.85652 0.5 10.637 1.2375 11.9497 2.55025C13.2625 3.86301 14 5.64348 14 7.5C14 8.88447 13.5895 10.2378 12.8203 11.389C12.0511 12.5401 10.9579 13.4373 9.67879 13.9672C8.3997 14.497 6.99224 14.6356 5.63437 14.3655C4.2765 14.0954 3.02922 13.4287 2.05026 12.4497C1.07129 11.4708 0.404603 10.2235 0.134506 8.86563C-0.13559 7.50776 0.00303298 6.1003 0.532846 4.82122C1.06266 3.54213 1.95987 2.44888 3.11101 1.67971ZM3.66658 12.4888C4.65328 13.1481 5.81332 13.5 7 13.5C8.5913 13.5 10.1174 12.8679 11.2426 11.7426C12.3679 10.6174 13 9.0913 13 7.5C13 6.31331 12.6481 5.15327 11.9888 4.16658C11.3295 3.17988 10.3925 2.41085 9.2961 1.95672C8.19975 1.5026 6.99335 1.38378 5.82946 1.61529C4.66558 1.8468 3.59648 2.41824 2.75736 3.25736C1.91825 4.09647 1.3468 5.16557 1.11529 6.32946C0.88378 7.49334 1.0026 8.69974 1.45673 9.7961C1.91085 10.8925 2.67989 11.8295 3.66658 12.4888Z"
        className={cx("fill-[#1E8E3E]", props?.iconClassName)}
      />
    </svg>
  );
};

export const FailedIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={props?.className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 7C14 3.13401 10.866 1.18292e-06 7 0C3.13401 -2.14186e-06 1.18292e-06 3.134 0 7C-2.14186e-06 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7ZM4.67091 3.94754L7.00001 6.29075L9.32912 3.94754L10.0384 4.65251L7.70499 7L10.0383 9.34749L9.32911 10.0525L7.00001 7.70925L4.67092 10.0525L3.96168 9.34749L6.29503 7L3.96167 4.65251L4.67091 3.94754Z"
        fill="#D93026"
      />
    </svg>
  );
};

//TODO: undefined issues
export const KeepIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={props?.className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={props?.iconClassName}
      >
        <path d="M5 3h1a1 1 0 0 1 1 1v2h3V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h3V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4.394a2 2 0 0 1-.336 1.11l-1.328 1.992a2 2 0 0 0-.336 1.11V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7.394a2 2 0 0 0-.336-1.11L4.336 9.504A2 2 0 0 1 4 8.394V4a1 1 0 0 1 1-1z" />
        <path d="M10 21v-5a2 2 0 1 1 4 0v5" />
      </g>
    </svg>
  );
};

export const ReverseIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="-1.5 -2.5 24 24"
      className={props?.className}
    >
      <path
        className={props?.iconClassName}
        fill="currentColor"
        d="m4.859 5.308l1.594-.488a1 1 0 0 1 .585 1.913l-3.825 1.17a1 1 0 0 1-1.249-.665L.794 3.413a1 1 0 1 1 1.913-.585l.44 1.441C5.555.56 10.332-1.035 14.573.703a9.381 9.381 0 0 1 5.38 5.831a1 1 0 1 1-1.905.608A7.381 7.381 0 0 0 4.86 5.308zm12.327 8.195l-1.775.443a1 1 0 1 1-.484-1.94l3.643-.909a.997.997 0 0 1 .61-.08a1 1 0 0 1 .84.75l.968 3.88a1 1 0 0 1-1.94.484l-.33-1.322a9.381 9.381 0 0 1-16.384-1.796l-.26-.634a1 1 0 1 1 1.851-.758l.26.633a7.381 7.381 0 0 0 13.001 1.25z"
      />
    </svg>
  );
};

export const MoveIcons = [KeepIcon, ReverseIcon];
