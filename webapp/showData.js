//global array. This way we can create other functions
//and still use this "categories" array.
var categoriesSearchArray = ["Ingen kategori"];
var nameSearchArray = ["Intet navn"];

//function is executed right after the website is loaded.
function loadFromServerToSearch() {
    $.getJSON("rest/item/getCategory/", function (data) {
        $.each(data, function (key, val) {
            //adding values to the global array
            console.log("Data: " + data);
            categoriesSearchArray.push(val);
        });
        console.log(categoriesSearchArray);
        makeCatSearchDropdown(categoriesSearchArray);
    });
    $.getJSON("rest/item/getBuyerNames/", function (data) {
        $.each(data, function (key, name) {
            console.log(key + ": " + name);
            nameSearchArray.push(name);
        });
        console.log(nameSearchArray);
        makeNameSearchDropdown(nameSearchArray);
    });
}

function makeCatSearchDropdown(data) {
    //getting jsonArray from server at "rest/item" as a GET.
    var dropdown = document.getElementById("categorySearch");
    console.log(data);
    //we loop over the data in jsonArray.
    $.each(data, function (key, val) {
        //creating our dropdown list of the data in the array
        var opt = document.createElement("option");
        opt.text = val;
        opt.value = val;
        dropdown.add(opt);
    })
}

function makeNameSearchDropdown(data) {
    var dropdown = document.getElementById("buyersNameSearch");
    $.each(data, function (key, name) {
        var opt = document.createElement("option");
        opt.text = name;
        opt.value = name;
        dropdown.add(opt);
    })
}

//sends json object to url="rest/item" when clicked on the button.
//this is for the server to "catch" it from that url.
function sendItemToServer() {
    event.preventDefault();
    var data = $('#showDataForm').serializeJSON();
    console.log(data);
    $.ajax({
        url: 'rest/item/getShowData/',
        method: 'POST',
        contentType: "application/json",
        data: data,
        success: function (data) {
               alert("SOVS");
               console.log("MERE SOVS");
               var totalPrice = 0;
            $("#dataTable").empty();
                $.each(data, function (key, val) {
                    totalPrice += val.price;
                    console.log("dataaaaaa:" + JSON.stringify(data));
                     $('#dataTable').append(generateTable(val));
                });
                $('#dataTable').append(showTotalPrice(totalPrice))
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    });
}

// function getTableData() {
//     $.getJSON('rest/item/getTableData/', function (data) {
//         $.each(data, function (key, val) {
//             console.log("dataaaaaa:" + data);
//             console.log("val: " + val);
//             $('#dataTable').append(generateTable(val));
//         });
//     });
// }

function generateTable(item) {
    return '<tr><td>' + item.productName + '</td>' +
        '<td>' + item.price + '</td>' +
        '<td>' + item.amount + '</td>' +
        '<td>' + item.category + '</td>' +
        '<td>' + item.buyersName + '</td>' +
        '<td>' + item.comment + '</td>' +
        '<td>' + item.dateOfPurchase + '</td></tr>'
}

function showTotalPrice(totalPrice) {
    return '<hr><tr><td>Pris i alt: </td>' +
        '<td>' + totalPrice + '</td></tr>'
}