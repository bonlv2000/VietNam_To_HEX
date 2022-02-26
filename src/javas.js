function textToHext(s) {
  var s = unescape(encodeURIComponent(s));
  var h = "";
  for (var i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }
  return h;
}

function hexToText(h) {
  var s = "";
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}

function hex_to_ascii_fix(str1) {
  var hex = str1.toString();
  var str = "";
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function decimalToHexString(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }

  return number.toString(16).toLowerCase();
}

function reverse(str) {
  let reversed = "";
  for (var i = str.length - 1; i >= 0; i -= 2) {
    reversed += str[i - 1] + str[i];
  }
  return reversed;
}

function bytecount_to_String(byteCount) {
  var decimaltoHex = decimalToHexString(byteCount);
  if (decimaltoHex.length == 1) {
    decimaltoHex = "000" + decimaltoHex;
  }
  if (decimaltoHex.length == 2) {
    decimaltoHex = "00" + decimaltoHex;
  }
  if (decimaltoHex.length == 3) {
    decimaltoHex = "0" + decimaltoHex;
  }
  if (decimaltoHex.length == 4) {
    decimaltoHex = reverse(decimaltoHex);
  }
  return decimaltoHex;
}

function copy() {
  try {
    var copyText = $("#textlast");
    copyText.select();
    document.execCommand("copy");
    toastr.success("Copy success!");
  } catch (erro) {
    toastr.error("Copy failed!");
  }
}

function convertTextToHex() {
  var text = $("#textfirst").val();
  if (text.length > 0) {
    var hex = textToHext(text);
    var byteCount = lengthInUtf8Bytes(text);
    var hetotext = hexToText(hex);
    var result = hex_to_ascii_fix(bytecount_to_String(byteCount)) + hetotext;

    // var blob = new Blob([result], {
    //   type: "text/plain;charset=utf-8;",
    // });
    // saveAs(blob, "thing.txt");
    var resultHex = bytecount_to_String(byteCount) + hex;
    $("#textlast").val(resultHex);
    copy();
  } else {
    toastr.info("Hãy nhập tiếng Việt");
  }
}
