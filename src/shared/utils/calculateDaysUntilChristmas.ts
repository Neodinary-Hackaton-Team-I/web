const calculateDaysUntilChristmas = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const christmasDate = new Date(currentYear, 11, 25);

  if (now > christmasDate) {
    christmasDate.setFullYear(currentYear + 1);
  }

  const diffInMs = christmasDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export default calculateDaysUntilChristmas;
