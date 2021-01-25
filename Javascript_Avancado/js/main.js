var list = [
    {"description":"rice", "amount":"1", "value":"5.40"},
    {"description":"beer", "amount":"12", "value":"1.99"},
    {"description":"beef", "amount":"1", "value":"15.00"}
];

function getTotal(list) {
    var total = 0;
    for (var key in list){
        total += list[key].amount * list[key].value;
    }
    return total;
}

function setList(list){
    var table = '<thead>\n' +
        '                    <tr>\n' +
        '                        <td>Description</td>\n' +
        '                        <td>Amount</td>\n' +
        '                        <td>Value</td>\n' +
        '                        <td>Action</td>\n' +
        '                    </tr>\n' +
        '                </thead>\n' +
        '                <tbody>';
    for(var key in list){
        table += '<tr>';
        table += '<td>'+formatDescription(list[key].description)+'</td>';
        table += '<td>'+list[key].amount+'</td>';
        table += '<td>'+formatValue(list[key].value)+'</td>';
        table += '<td><button onclick="setUpdate('+key+')" class="btn btn-outline-dark">Edit</button> | <button class="btn btn-outline-danger">Delete</button></td>';
        table += '</tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
}

function formatDescription(description) {
    var str = description.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + '';
    str = str.replace('.', ',');
    str = 'R$ ' + str;
    return str;
}

function addData() {
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;


    list.unshift({"description":description, "amount":amount, "value":value});
    //console.log(list);
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById('description').value = obj.description;
    document.getElementById('amount').value = obj.amount;
    document.getElementById('value').value = obj.value;
    document.getElementById('btnAdd').style.display = "none";
    document.getElementById('btnUpdate').style.display = "inline-block";
    document.getElementById('inputIdUpdate').value = id;
}

function resetForm() {
    document.getElementById('description').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('value').value = "";
    document.getElementById('inputIdUpdate').value = "";
    document.getElementById('btnAdd').style.display = "inline-block";
    document.getElementById('btnUpdate').style.display = "none";
}

function updateData() {
    var id = document.getElementById('inputIdUpdate').value;
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    list[id] = {"description":description, "amount":amount, "value":value};
    resetForm();
    setList(list);
}
setList(list);

//console.log(list);
