export function getFinancialYear():String {
    const today = new Date();
    //get current month
    const curMonth = today.getMonth();
    let fiscalYr = "";
    if (curMonth > 3) {
      let nextYr1 = (today.getFullYear() + 1).toString();
      fiscalYr = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
      let nextYr2 = today.getFullYear().toString();
      fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }
    return fiscalYr;
  }