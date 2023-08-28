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
            for (var j = 0; j < 9; j++) {
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
        output(num);
    }
}

function output(num) {
    var rs = "";
    if (L[num] == 0) rs = "Khong the doi tien!";
    else {
        var count = new Array();
        for (var i = 0; i < 9; i++)
            count[i] = 0;
        rs += num + " = ";
        var count1 = 0, count2 = 0;
        while(num != 0) {
            count1++;
            switch(backtrack[num]) {
                case 1:
                    count[0]++;
                    break;
                case 2:
                    count[1]++;
                    break;
                case 5:
                    count[2]++;
                    break;
                case 10:
                    count[3]++;
                    break;
                case 20:
                    count[4]++;
                    break;
                case 50:
                    count[5]++;
                    break;
                case 100:
                    count[6]++;
                    break;
                case 200:
                    count[7]++;
                    break;
                case 500:
                    count[8]++;
                    break;
            }
            num -= backtrack[num];
        }
        for (var i = 0; i < 9; i++) {
            if (count[i] != 0) {
                count2 += count[i];
                if (count[i] == 1) rs += arrMoney[i];
                else rs += arrMoney[i] + "*" + count[i];
                if (count2 < count1) rs += " + ";
            }
        }
        document.getElementById("result").innerHTML = rs;
        showPopup(true);
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