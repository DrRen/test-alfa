const express = require('express');
let json = require('./testdata.json');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(8080, "127.0.0.1", (err) => {
    if (err){
        console.log(err);
    } else {
        console.log("Server running and listening on port 8080...");
    }
})


//=====================================Обработка get запросов==================
app.get('/', function(req, res) {       
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/css/main.css', function(req, res) {
    res.sendFile((__dirname + '/public/css/main.css'));
});

app.get('/js/script.js', function(req, res) {
    res.sendFile((__dirname + '/public/js/script.js'));
});
//=====================================Обработка get запросов (КОНЕЦ)==================


//=====================================Обработка post запросов==================
app.post('/', function(req, res) {
    switch (req.body.hashKey){
        case '#home': res.send('Главная страница');
            break;
        case '#top': res.send(getTop());
            break;
        case '#full': res.send(getFull());
            break;
    }
});
//=====================================Обработка post запросов (КОНЕЦ)==================


function getTop(){                                //Определение записей со значением place ниже 6 т.е первые 5 мест
    let formList = getFull();
    let topList = [];
    for (let element of formList){
        if (element.place < 6)
            topList.push(element);
        else break;
    }
    return topList;
}

function getFull(){
    let formList = [];
    json.forEach(element => {                      //создание нового масива объеектов с нужными данными
        formList.push({
            fio: element.fio,
            status: element.level,
            exp: JSON.parse(element.resources).find((element, index, array) => {
                return element.resource == "ACTIVERATE";
                }).value + 
                JSON.parse(element.resources).find((element, index, array) => {
                return element.resource == "PASSIVERATE";
                }).value,
            money: JSON.parse(element.resources).find((element, index, array) => {
                return element.resource == "MONEY";
                }).value
        })
    });
    formList.sort((a,b) => {                        //сортировка по опыту и деньгам 
        if (b.exp - a.exp != 0){
        return b.exp - a.exp
        } else {
        return b.money - a.money
        }
        });
    let placeCount=1;                               //распределение мест
    formList.forEach((element, index, array) => {
    if (index+1 < formList.length){
        if (element.exp > formList[index+1].exp){
            element.place = placeCount;
            placeCount++;
        } else if (element.money > formList[index+1].money){
            element.place = placeCount;
            placeCount++;
        } else {
            element.place = placeCount;
        }} else {element.place = placeCount;}
    });

    return formList;
}