"use client";
import useInTransaction from "@/hooks/useInTransaction";
import Button from "@/components/Button";
import { useTimeout } from "@/services/timeout";

const TimeoutBtn: React.FC<{
  timeout: "first hand" | "second hand" | "end";
}> = ({ timeout }) => {
  if (timeout === "first hand") return <J1TimeoutBtn />;
  if (timeout === "second hand") return <J2TimeoutBtn />;
  return <></>;
};

const J1TimeoutBtn: React.FC = () => {
  const { j1Timeout } = useTimeout();
  const { loading, handleExecAction } = useInTransaction(j1Timeout);
  return loading ? (
    <Button disabled={true}>pending...</Button>
  ) : (
    <Button onClick={handleExecAction}>
      timeout, end the game to withdraw
    </Button>
  );
};

const J2TimeoutBtn: React.FC = () => {
  const { j2Timeout } = useTimeout();
  const { loading, handleExecAction } = useInTransaction(j2Timeout);
  return loading ? (
    <Button disabled={true}>pending...</Button>
  ) : (
    <Button onClick={handleExecAction}>timeout, end the game manually</Button>
  );
};

export default TimeoutBtn;
