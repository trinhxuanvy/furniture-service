const firebase = require("./firebase");

function getDates(startDate, endDate) {
  let dateArray = new Array();
  let currentDate = startDate;

  while (currentDate < endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

function getMonths(startDate, endDate) {
  let dateArray = new Array();
  let currentDate = startDate;

  while (currentDate < endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dateArray;
}

function getYears(startDate, endDate) {
  let dateArray = new Array();
  let currentDate = startDate;

  while (currentDate.getFullYear() < endDate.getFullYear()) {
    dateArray.push(new Date(currentDate));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }

  return dateArray;
}

exports.statisticWithDaily = (data, startDate, endDate) => {
  let result = new Array(); // Kết quả cuối cùng obj: { date: Date, units: Int }
  let listData = new Array();
  let dateArray = getDates(startDate, endDate);
  let sum = 0; // Cộng dồn doanh thu trong từng ngày
  let dateTemp;

  if (data.length) {
    dateTemp = data[0].createdAt;
    dateTemp.setHours(0, 0, 0, 0);
  }

  for (let i = 0; i < data.length; i++) {
    data[i].createdAt.setHours(0, 0, 0, 0);

    if (dateTemp.getTime() == data[i].createdAt.getTime()) {
      sum += data[i].subTotalPrice;
    } else {
      listData.push({ date: dateTemp.getTime(), units: sum });
      sum = data[i].subTotalPrice;
    }

    dateTemp = new Date(data[i].createdAt);
  }

  if (data.length) {
    listData.push({ date: dateTemp.getTime(), units: sum });
  }

  let k = 0,
    l = 0;
  while (true) {
    if (k == dateArray.length) {
      break;
    }

    if (l < listData.length) {
      if (dateArray[k].getTime() == listData[l].date) {
        dateTemp = new Date(listData[l].date);
        result.push({
          date:
            dateTemp.getMonth() +
            1 +
            "-" +
            dateTemp.getDate() +
            "-" +
            dateTemp.getFullYear(),
          units: listData[l].units,
        });
        l++;
      } else {
        result.push({
          date:
            dateArray[k].getMonth() +
            1 +
            "-" +
            dateArray[k].getDate() +
            "-" +
            dateArray[k].getFullYear(),
          units: 0,
        });
      }
    } else {
      result.push({
        date:
          dateArray[k].getMonth() +
          1 +
          "-" +
          dateArray[k].getDate() +
          "-" +
          dateArray[k].getFullYear(),
        units: 0,
      });
    }

    k++;
  }

  return result;
};

exports.statisticWithMonthly = (data, startDate, endDate) => {
  let result = new Array(); // Kết quả cuối cùng obj: { date: Date, units: Int }
  let listData = new Array();
  let dateArray = getMonths(startDate, endDate);
  let sum = 0; // Cộng dồn doanh thu trong từng ngày
  let dateTemp;

  if (data.length) {
    dateTemp = data[0].createdAt;
    dateTemp.setDate(1);
    dateTemp.setHours(0, 0, 0, 0);
  }

  for (let i = 0; i < data.length; i++) {
    data[i].createdAt.setDate(1);
    data[i].createdAt.setHours(0, 0, 0, 0);

    if (dateTemp.getTime() == data[i].createdAt.getTime()) {
      sum += data[i].subTotalPrice;
    } else {
      listData.push({ date: dateTemp.getTime(), units: sum });
      sum = data[i].subTotalPrice;
    }

    dateTemp = new Date(data[i].createdAt);
  }

  if (data.length) {
    listData.push({ date: dateTemp.getTime(), units: sum });
  }

  let k = 0,
    l = 0;
  while (true) {
    if (k == dateArray.length) {
      break;
    }

    if (l < listData.length) {
      if (dateArray[k].getTime() == listData[l].date) {
        dateTemp = new Date(listData[l].date);
        result.push({
          date: dateTemp.getMonth() + 1 + "-" + dateTemp.getFullYear(),
          units: listData[l].units,
        });
        l++;
      } else {
        result.push({
          date: dateArray[k].getMonth() + 1 + "-" + dateArray[k].getFullYear(),
          units: 0,
        });
      }
    } else {
      result.push({
        date: dateArray[k].getMonth() + 1 + "-" + dateArray[k].getFullYear(),
        units: 0,
      });
    }

    k++;
  }

  return result;
};

exports.statisticWithYearly = (data, startDate, endDate) => {
  let result = new Array(); // Kết quả cuối cùng obj: { date: Date, units: Int }
  let listData = new Array();
  let dateArray = getYears(startDate, endDate);
  let sum = 0; // Cộng dồn doanh thu trong từng ngày
  let dateTemp;

  if (data.length) {
    dateTemp = data[0].createdAt;
    dateTemp.setDate(1);
    dateTemp.setMonth(1);
    dateTemp.setHours(0, 0, 0, 0);
  }

  for (let i = 0; i < data.length; i++) {
    data[i].createdAt.setDate(1);
    data[i].createdAt.setMonth(1);
    data[i].createdAt.setHours(0, 0, 0, 0);

    if (dateTemp.getTime() == data[i].createdAt.getTime()) {
      sum += data[i].subTotalPrice;
    } else {
      listData.push({ date: dateTemp.getTime(), units: sum });
      sum = data[i].subTotalPrice;
    }

    dateTemp = new Date(data[i].createdAt);
  }

  if (data.length) {
    listData.push({ date: dateTemp.getTime(), units: sum });
  }

  let k = 0,
    l = 0;
  while (true) {
    if (k == dateArray.length) {
      break;
    }

    if (l < listData.length) {
      if (dateArray[k].getTime() == listData[l].date) {
        dateTemp = new Date(listData[l].date);
        result.push({
          date: dateTemp.getFullYear(),
          units: listData[l].units,
        });
        l++;
      } else {
        result.push({
          date: dateArray[k].getFullYear(),
          units: 0,
        });
      }
    } else {
      result.push({
        date: dateArray[k].getFullYear(),
        units: 0,
      });
    }

    k++;
  }

  return result;
};

exports.uploadFile = async (req, res, next) => {
  let upload = [];
  if (req?.files) {
    upload = await firebase.uploadImage(req?.files?.[0]);
  }

  if (upload.length) {
    res.send({ url: upload, success: true });
  } else {
    res.send({ success: false });
  }
};

exports.randomStr = (length) => {
  var result = "";
  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var number = "0123456789";
  var upperLength = upper.length;
  var lowerLength = lower.length;
  var numberLength = number.length;

  for (var i = 0; i < 2; i++) {
    result += upper.charAt(Math.floor(Math.random() * upperLength));
  }
  for (var i = 0; i < 3; i++) {
    result += lower.charAt(Math.floor(Math.random() * lowerLength));
  }
  for (var i = 0; i < 3; i++) {
    result += number.charAt(Math.floor(Math.random() * numberLength));
  }

  return result.shuffle();
};

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};
