export const getSubscriptionPeriodDate = (
  periodStart: number,
  periodEnd: number,
) => {
  const currentPeriodStart = new Date(periodStart * 1000);
  const currentPeriodEnd = new Date(periodEnd * 1000);

  return {
    currentPeriodStart,
    currentPeriodEnd,
  };
};
