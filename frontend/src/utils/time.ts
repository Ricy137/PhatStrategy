//due to network latency, the time countdown only provide roughly time
export const secondToFormat = (seconds: number) => {
  if (seconds < 0) return "time out!";
  if (seconds < 60) return "less than 1 minute";
  if (seconds < 120) return "less than 2 minute left";
  return "More than 2 minute left";
};
