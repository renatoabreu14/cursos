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
        table += '<td><button onclick="setUpdate('+key+')" class="btn btn-outline-dark">Edit</button> | <button onclick="deleteData('+key+')"  class="btn btn-outline-danger">Delete</button></td>';
        table += '</tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
    document.getElementById('totalValue').innerHTML = formatValue(getTotal(list));
    saveListStorage(list);
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
    if (!validation()){
        return;
    }
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
    document.getElementById('errors').style.display = "none";
}

function updateData() {
    if (!validation()){
        return;
    }
    var id = document.getElementById('inputIdUpdate').value;
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    list[id] = {"description":description, "amount":amount, "value":value};
    resetForm();
    setList(list);
}

function deleteData(id) {
    if(confirm('Deseja realmente excluir esse registro?')){
        if(id === list.length-1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation() {
    var description = document.getElementById('description').value;
    var amount = parseInt('0'+document.getElementById('amount').value);
    var value = parseFloat('0'+document.getElementById('value').value);
    var errors = "";

    if (description === ""){
        errors += '<p>Informe a descrição</p>';
    }
    if (amount <= 0){
        errors += '<p>A quantidade deve ser maior que zero</p>';
    }
    if (value <= 0){
        errors += '<p>O valor deve ser maior que zero</p>';
    }
    if (errors != ""){
        document.getElementById('errors').style.display = "block";
        document.getElementById('errors').style.backgroundColor = "rgba(247,36,36,0.65)";
        document.getElementById('errors').style.color = "white";
        document.getElementById('errors').style.padding = "10px";
        document.getElementById('errors').style.margin = "10px";
        document.getElementById('errors').style.borderRadius = "13px";
        document.getElementById('errors').innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }
    return 1;
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();

//console.log(list);
