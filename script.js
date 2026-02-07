let lastData = null;

function value(id) {
  return Number(document.getElementById(id).value || 0);
}

function dzMoneyText(amount) {
  amount = Math.round(amount);
  let million = Math.floor(amount / 10000);
  let rest = amount % 10000;
  let text = "";
  if (million > 0) text += million + " مليون";
  if (rest > 0) {
    if (text !== "") text += " و ";
    text += (rest * 100).toLocaleString("ar-DZ") + " ألف";
  }
  return text || "0";
}

function calculate() {
  let chickPrice = value("chickPrice");
  let chickCount = value("chickCount");
  let feedPrice = value("feedPrice");
  let feedUsed = value("feedUsed");
  let sellPrice = value("sellPrice");
  let commission = value("commission");

  let medicine = value("medicine");
  let energy = value("energy");
  let workers = value("workers");
  let litter = value("litter");
  let cleaning = value("cleaning");
  let rent = value("rent");

  let deadBig = value("deadBig");
  let deadMid = value("deadMid");
  let deadSmall = value("deadSmall");
  let unsold = value("unsold");

  let totalWeight = value("totalWeight");

  let lostFeed =
    (deadBig / 100) * 3 +
    (deadMid / 100) * 1.8 +
    (deadSmall / 100) * 0.7;

  let totalCosts =
    chickPrice * chickCount +
    feedUsed * feedPrice +
    lostFeed * feedPrice +
    medicine + energy + workers + litter + cleaning + rent;

  let totalDead = deadBig + deadMid + deadSmall;
  let sold = chickCount - totalDead - unsold;
  if (sold < 1) sold = 1;

  let unsoldLoss = (totalCosts / sold) * unsold;
  totalCosts += unsoldLoss;

  let netSell = sellPrice - commission;
  let income = totalWeight * netSell;
  let profit = income - totalCosts;

  let avgWeight = totalWeight / sold;
  let costKg = totalCosts / totalWeight;

  lastData = { sellPrice, feedPrice, feedUsed, profit, totalCosts, totalWeight, commission };

  document.getElementById("result").innerHTML = `
    <p> المداخيل: ${income.toFixed(0)} دج<br>(${dzMoneyText(income)})</p>
    <p> التكاليف: ${totalCosts.toFixed(0)} دج<br>(${dzMoneyText(totalCosts)})</p>
    <p> خسارة غير المباع: ${unsoldLoss.toFixed(0)} دج</p>
    <p>⚖️ متوسط الوزن: ${avgWeight.toFixed(2)} كغ</p>
    <p> تكلفة الكيلو: ${costKg.toFixed(2)} دج</p>
    <h3 class="${profit >= 0 ? "profit" : "loss"}">
      ${profit >= 0 ? "✅ ربح" : "❌ خسارة"}:
      ${profit.toFixed(0)} دج<br>(${dzMoneyText(profit)})
    </h3>
  `;
}

function showWhatIf() {
  if (!lastData) return alert("احسب النتيجة أولاً");
  document.getElementById("whatIfBox").style.display = "block";
}

function whatIfSell(x) {
  let p = (lastData.totalWeight * (lastData.sellPrice + x - lastData.commission)) - lastData.totalCosts;
  showWhatIfResult(p);
}

function whatIfFeed(q) {
  let p = lastData.profit + q * lastData.feedPrice;
  showWhatIfResult(p);
}

function whatIfDeath(pct) {
  let p = lastData.profit + (pct / 100) * lastData.totalCosts;
  showWhatIfResult(p);
}

function showWhatIfResult(profit) {
  document.getElementById("whatIfResult").innerHTML = `
    <p class="${profit >= 0 ? "profit" : "loss"}">
      النتيجة الجديدة: ${profit.toFixed(0)} دج<br>
      (${dzMoneyText(profit)})
    </p>`;
}
