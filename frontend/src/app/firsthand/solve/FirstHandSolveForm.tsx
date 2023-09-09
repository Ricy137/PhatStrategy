"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import { WrapperCard } from "@/components/Card";
import Input from "@/components/Input";
// import { useShowToast } from "@/components/Toast";
import MoveBoard from "@/modules/MoveBoard";
import AuthConnect from "@/modules/AuthConnect";
import { useResolveGame } from "@/services/game";
// import { errorMessage } from "@/utils/error";

interface SolveForm {
  move: number;
  salt: string;
}

const FirstHandSolveForm: React.FC = () => {
  const resolveGame = useResolveGame();
  // const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SolveForm>();
  const onSubmit = useCallback(async ({ move, salt }: SolveForm) => {
    try {
      await resolveGame(move, salt);
    } catch (err) {
      if (err instanceof Error) {
        // const message = errorMessage(err);
        // showToast({ content: message, type: "failed" });
      }
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="flex flex-col gap-y-[24px] grow w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <div className="flex flex-col items-center gap-y-[8px] w-full">
          Re-enter the move you made:
          <MoveBoard
            {...register("move", {
              required: true,
              validate: (value) => value > 0,
            })}
            setValue={setValue}
            error={!!errors.move}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[8px]">
          <Input
            title="Salt:"
            type="password"
            {...register("salt", {
              required: true,
            })}
          />
        </div>
        <AuthConnect>
          <input
            type="submit"
            value={loading ? "pending..." : "resolve the result"}
            className={cx(
              "px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]",
              loading && "pointer-events-none cursor-not-allowed opacity-30"
            )}
          />
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default FirstHandSolveForm;
