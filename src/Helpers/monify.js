const monify = numStr => {
  const num = Number(numStr);
  let result;
  if (num === Math.floor(num)) {
    result = num.formatMoney(0);
  } else {
    result = num.formatMoney(2);
  }
  return "$" + result;
};

const commafy = num => {
  return Number(num).formatMoney(0, ".", ",");
};

Number.prototype.formatMoney = function(c, d, t) {
  var n = this,
    c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
};

export { monify, commafy };
