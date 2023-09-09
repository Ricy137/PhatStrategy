"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import cx from "clsx";
import { WrapperCard } from "@/components/Card";
import AuthConnect from "@/modules/AuthConnect";
import MoveBoard from "@/modules/MoveBoard";
import useInTransaction from "@/hooks/useInTransaction";
import { requestAtom } from "@/services/game/request";

interface FirsthandForm {
  move: number;
}

const SecondhandPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FirsthandForm>();
  const [, mutate] = useAtom(requestAtom);
  const router = useRouter();

  const onSubmit = useCallback(async (data: FirsthandForm) => {
    try {
      await mutate([data.move]);
      router.push("/secondhand/solve");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
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
        <AuthConnect>
          <input
            type="submit"
            value={loading ? "pending..." : "Commit your move"}
            className={cx(
              "px-[40px] flex flex-row justify-center items-center h-[36px] border-[1px] border-solid border-[#000000] whitespace-nowrap cursor-pointer rounded-[30px]",
              loading && "bg-gray-400 pointer-events-none cursor-not-allowed"
            )}
          />
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default SecondhandPage;
