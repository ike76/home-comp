const monify = numStr => {
  const num = Number(numStr);
  let result;
  if (num === Math.floor(num)) {
    result = formatMoney(num, 0);
  } else {
    formatMoney(num, 2);
  }
  return "$" + result;
};

const commafy = num => {
  return formatMoney(num, 0, ".", ",");
};

const formatMoney = function(num, _c, _d, _t) {
  let n = Number(num),
    c = isNaN((_c = Math.abs(_c))) ? 2 : _c,
    d = _d === undefined ? "." : _d,
    t = _t === undefined ? "," : _t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)), 10));
  let j;
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
