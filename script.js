//------------------------------------------------------------------------------------
function cntry(){
let httpRequest=new XMLHttpRequest;
var country=[];
var v="";
var ele=document.getElementById("cntry");
httpRequest.open("GET","https://api.covid19api.com/countries",true);
httpRequest.onreadystatechange=function(){
    if (httpRequest.readyState===4 && httpRequest.status===200){
    res=JSON.parse(httpRequest.response)
    for(i=0;i<res.length; i++ ){
        country.push(res[i].Country);
        v=v + `<a  id="c${i}"  onclick="graph(getvalue(id))" href="#" >${country[i]}</a>`
    }
    ele.outerHTML=v;
}}
httpRequest.send();
}
cntry();
//------------------------------------------------------------------------------------
function getvalue(d){
    var elem=document.getElementById(d);
    return(elem.innerHTML);
}
//------------------------------------------------------------------------------------
function graph(country) {
    let httpRequest2=new XMLHttpRequest;
    var Confirmés=[];
    var Géris=[];
    var Décés=[];
    var Active=[];
    var date=[];
    var ele=document.getElementById("cntry");
    httpRequest2.open("GET","https://api.covid19api.com/dayone/country/"+country,true);
    httpRequest2.onreadystatechange=function(){
        if (httpRequest2.readyState===4 && httpRequest2.status===200){
        res=JSON.parse(httpRequest2.response)
        for(i=0;i<res.length; i++ ){
            Confirmés.push(res[i].Confirmed)
            Géris.push(res[i].Recovered)
            Décés.push(res[i].Deaths)
            Active.push(res[i].Active)
            date.push(res[i].Date.slice(5,10))
        }
        var cc=Array(Confirmés) 
        var ctx = document.getElementById('chart').getContext('2d');
        if(window.bar !=undefined){
            window.bar.destroy();
        }
        window.bar = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date ,
            datasets: [{
                label: 'Confirmés',
                data:Confirmés,
                borderColor:'#800080'
            },
            {
                label:'Géris',
                data: Géris,
                borderColor:'green'
            },
            {
                label:'Décés',
                data: Décés,
                borderColor:'red'
            },
            {
                label:'Active',
                data: Active,
                borderColor:'yellow'
            },
        ]
        },
        options: {
            title: {
                display: true,
                text: country
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    }}
    httpRequest2.send();
}
//------------------------------------------------------------------------------------
