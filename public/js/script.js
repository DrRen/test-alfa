window.onhashchange = function(){                           // вызываем render при обновлении хэша
    render(window.location.hash);
};

function render(hashKeyLoc) {

    switch(hashKeyLoc){                                     // отправляем соответствующие запросы сообтветственно хэшу
        
        case "#home": $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify({hashKey: hashKeyLoc}),
            success:(data)=>{
                if(data !="")
                {   
                    document.getElementById("contentDiv").innerHTML = "";
                    var div = document.createElement("div");
                    div.className = "homeInfo"
                    div.innerHTML = data;
                    document.getElementById("contentDiv").appendChild(div);
                }
            }, 
        }); break; 

        case "#full": $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify({hashKey: hashKeyLoc}),
            success:(data)=>{
                if(data !="")
                {
                    constructTable(data);
                }
            }
        }); break; 

        case "#top": $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify({hashKey: hashKeyLoc}),
            success:(data)=>{
                if(data !="")
                {
                    constructTable(data);
                }
            }
        }); break; 

        default: $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify({hashKey: hashKeyLoc}),
            success:(data)=>{
                if(data !="")
                {
                    alert(data);
                }
            }
        }); break;    

    }
}

function constructTable(data){                                 // функция строит таблицу из полученного data массива
    document.getElementById("contentDiv").innerHTML = "";
    let tbody = document.createElement("table");
    tbody.className = "table";
    document.getElementById("contentDiv").appendChild(tbody);

    var tr = document.createElement("tr");

    var place = document.createElement("td");
    place.innerHTML = "Место";
    tr.appendChild(place);

    var fio = document.createElement("td");
    fio.innerHTML = "ФИО";
    tr.appendChild(fio);

    var status = document.createElement("td");
    status.innerHTML = "Статус";
    tr.appendChild(status);
    
    var exp = document.createElement("td");
    exp.innerHTML = "Опыт";
    tr.appendChild(exp);

    var money = document.createElement("td");
    money.innerHTML = "Монеты";
    tr.appendChild(money);

    tbody.appendChild(tr);
        
    data.forEach(element => {
        var tr = document.createElement("tr");

        var place = document.createElement("td");
        place.innerHTML = element.place;
        tr.appendChild(place);

        var fio = document.createElement("td");
        fio.innerHTML = element.fio;
        tr.appendChild(fio);

        var status = document.createElement("td");
        status.innerHTML = element.status;
        tr.appendChild(status);
        
        var exp = document.createElement("td");
        exp.innerHTML = element.exp;
        tr.appendChild(exp);

        var money = document.createElement("td");
        money.innerHTML = element.money;
        tr.appendChild(money);

        tbody.appendChild(tr);
    });
    
    
}