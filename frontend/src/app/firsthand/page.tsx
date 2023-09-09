"use client";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import { WrapperCard } from "@/components/Card";
import Input from "@/components/Input";
import MoveBoard from "@/modules/MoveBoard";

interface FirsthandForm {
  move: number;
  stake: number;
  firstHandle: string;
  secondHandle: string;
}

const FirsthandPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FirsthandForm>();

  const onSubmit = useCallback(async (data: FirsthandForm) => {
    console.log(data);
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <MoveBoard
          {...register("move", {
            required: true,
            validate: (value) => value > 0,
          })}
          setValue={setValue}
          error={!!errors.move}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] w-full sm:w-fit">
          <Input
            title="Stake amount in ether:"
            type="number"
            lableClassName="w-[300px] sm:text-end"
            {...register("stake", {
              required: true,
              validate: (value) => value > 0,
            })}
            min={0.000000000000000001}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] w-full sm:w-fit">
          <Input
            title="What's the handle for first player?"
            lableClassName="w-[300px] sm:text-end"
            type="text"
            error={!!errors.firstHandle}
            {...register("firstHandle", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] w-full sm:w-fit">
          <Input
            title="What's the handle for second player?"
            lableClassName="w-[300px] sm:text-end"
            type="text"
            error={!!errors.secondHandle}
            {...register("secondHandle", {
              required: true,
            })}
          />
        </div>
      </form>
    </WrapperCard>
  );
};

export default FirsthandPage;
