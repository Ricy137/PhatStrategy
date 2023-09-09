export const getGameStatus = (stake: string, c2: string) => {
  if (stake == "0") return "Null";
  if (c2 == "0") return "J2Moving";
  return "J1Solving";
};
