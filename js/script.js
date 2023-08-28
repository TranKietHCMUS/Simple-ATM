var input = "";
showPopup(false);

function addInput(par) {
    if (par == 10) input += "00";
    else if (par == 'C') input = "";
    else if (par == -1) {
        if (parseInt(input) < 10) input = "";
        else input = parseInt(input/10).toString();
    }
    else input += par;
    document.getElementById("money").value = input;
}

var L = new Array();
var backtrack = new Array();
var arrMoney = [1, 2, 5, 10, 20, 50, 100, 200, 500];

function tradeMoney() {
    if (input == "") {
        alert("Please enter money!");
        document.getElementById("money").focus();
    }
    else {
        var num = parseInt(input);
        for (var i = 0; i <= num; i++) {
            L[i] = 0;
            backtrack[i] = 0;
            for (var j = 0; j < 8; j++) {
                if (i == arrMoney[j]) {
                    L[i] = 1;
                    backtrack[i] = i;
                }
                else if (i > arrMoney[j] && L[i - arrMoney[j]] != 0) {
                    if (L[i] == 0) {
                        L[i] = L[i - arrMoney[j]] + 1;
                        backtrack[i] = arrMoney[j];
                    }
                    else {
                        if (L[i] > L[i - arrMoney[j]] + 1) {
                            L[i] = L[i - arrMoney[j]] + 1;
                            backtrack[i] = arrMoney[j];
                        }
                    }
                }
            }
        }
        var rs = "";
        if (L[num] == 0) rs = "Khong the doi tien!";
        else {
            rs += num + " = ";
            while(num != 0) {
                rs += backtrack[num]
                num -= backtrack[num];
                if (num != 0) rs += " + ";
            }
            document.getElementById("result").innerHTML = rs;
            showPopup(true);
        }
    }
}

function showPopup(bool) {
    if (bool) {
        document.getElementById('popup').style.visibility = 'visible';
    } else {
        document.getElementById('popup').style.visibility = 'hidden';
        input = "";
        document.getElementById("money").value = input;
    }
}