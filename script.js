function formatCurrency(value) {
  // تحويل الرقم إلى صيغة مليون / ألف
  if (value >= 1000000) {
    let millions = Math.floor(value / 1000000);
    let thousands = Math.floor((value % 1000000) / 1000);
    return `${millions} مليون و ${thousands} ألف`;
  } else if (value >= 1000) {
    let thousands = Math.floor(value / 1000);
    let hundreds = value % 1000;
    return `${thousands} ألف و ${hundreds}`;
  } else {
    return value;
  }
}

function calculate() {
  let priceChick = Number(document.getElementById("priceChick").value);
  let numChicks = Number(document.getElementById("numChicks").value);
  let feedPrice = Number(document.getElementById("feedPrice").value);
  let feedUsed = Number(document.getElementById("feedUsed").value);
  let sellPrice = Number(document.getElementById("sellPrice").value);
  let commission = Number(document.getElementById("commission").value);
  let medicine = Number(document.getElementById("medicine").value);
  let waterEnergy = Number(document.getElementById("waterEnergy").value);
  let workers = Number(document.getElementById("workers").value);
  let bedding = Number(document.getElementById("bedding").value);
  let cleaning = Number(document.getElementById("cleaning").value);
  let taxes = Number(document.getElementById("taxes").value);
  let deadLarge = Number(document.getElementById("deadLarge").value);
  let deadMedium = Number(document.getElementById("deadMedium").value);
  let deadSmall = Number(document.getElementById("deadSmall").value);
  let unsold = Number(document.getElementById("unsold").value);
  let totalWeight = Number(document.getElementById("totalWeight").value);

  // حساب تكاليف
  let costChicks = priceChick * numChicks;
  let costFeed = feedPrice * feedUsed;
  let costCommission = commission * totalWeight;
  let costDead = (deadLarge*3 + deadMedium*1.5 + deadSmall*0.5) * sellPrice; // تقدير الخسائر
  let costUnsold = unsold * sellPrice;

  let totalCost = costChicks + costFeed + medicine + waterEnergy + workers + bedding + cleaning + taxes + costCommission + costDead + costUnsold;

  let totalIncome = sellPrice * totalWeight;

  let profit = totalIncome - totalCost;

  // عرض النتائج
  let resultDiv = document.getElementById("result");
  if(profit >= 0){
    resultDiv.innerHTML = `<p class="profit">الربح المتوقع: ${formatCurrency(profit)}</p>`;
  } else {
    resultDiv.innerHTML = `<p class="loss">الخسارة المتوقعة: ${formatCurrency(Math.abs(profit))}</p>`;
  }
}
