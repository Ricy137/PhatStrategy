"use client";
import {
  useState,
  useCallback,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react";
import cx from "clsx";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { MoveIcons } from "@/components/Icons";
import { Move } from "@/services/game";
import renderReactNode from "@/utils/renderReactNode";

interface MoveItemProps {
  selectedValue?: number;
  value: number;
  icon: ReactNode | Function;
  onClick: (selectedValue: number) => void;
}

const MoveItem: React.FC<MoveItemProps> = ({
  selectedValue,
  value,
  icon,
  onClick,
}) => {
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClick(value);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={cx(
        "p-[16px] flex flex-col sm:flex-row justify-center items-center gap-x-[8px] w-full h-[100px] sm:h-[300px] text-[16px] leading-[24px] border-[1px] border-[#111111] hover:border-[#292E41] text-[#111111] hover:text-[#292E41] hover:bg-[#CBF0ED] cursor-pointer",
        selectedValue === value &&
          "border-[#292E41] text-[#292E41] bg-[#292E410a]"
      )}
    >
      {renderReactNode(icon)}
      {Move[value]}
    </div>
  );
};

const MoveBoard = forwardRef<
  HTMLSelectElement,
  ReturnType<UseFormRegister<any>> & {
    setValue: UseFormSetValue<any>;
    error?: boolean;
  }
>(({ setValue, onChange, onBlur, name, error, ...props }, _forwardRef) => {
  const { ref, ...rest } = props;
  const [selectedValue, setSelectedValue] = useState<number>();

  const onClick = useCallback((newSelectedValue: number) => {
    setValue(name, newSelectedValue);
    setSelectedValue(newSelectedValue);
  }, []);

  return (
    <>
      <div
        className={cx(
          "w-full grid grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 items-center border-[1px] border-black",
          error && "!border-[#E96170]"
        )}
      >
        <select
          // hidden
          className="hidden"
          ref={_forwardRef}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={selectedValue}
          autoComplete="off"
          {...rest}
        >
          {Move.map((move, index) => (
            <option key={move} value={index} />
          ))}
        </select>
        {Move.map((move, index) => {
          if (index === 0) return;
          return (
            <MoveItem
              key={move}
              value={index}
              icon={MoveIcons[index - 1]}
              onClick={onClick}
              selectedValue={selectedValue}
            />
          );
        })}
      </div>
    </>
  );
});

export default MoveBoard;
