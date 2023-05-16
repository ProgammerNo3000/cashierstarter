const list_box = document.querySelector("#scanned");
const receipt_list = document.querySelector("#receipt");

const button_pay = document.querySelector("#pay_now");
const button_received = document.querySelector("#received");
const input = document.querySelector("#input");


input.value = ""; // reset of payment input of user
let sum = 0; // adding up the article prices
let sumreceipt = 0; // adding up the article prices
let change = 0; // change for user after payment
let output = ""; // text for elements with article name and price while creating <li> elements
let receipt_printed = false; // flag to check, not print receipt multiple times

// listen on button that button pay is clicked
button_pay.addEventListener("click", () => {
  alert("Please pay now your purchase, enter amount received and press RECEIVED");
});

// listen on button that button received is clicked
button_received.addEventListener("click", () => {
  // console.log(input.value);
  // console.log(sum.toFixed(2));
  change = input.value - sum.toFixed(2);
  // console.log(change.toFixed(2));

  if (change >= 0 && receipt_printed == false) {
    receipt_printed = true; // receipt is printed
    document.getElementById("change").innerText = "Change: " + change.toFixed(2) +" EUR";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var articles = response.articles;
        
        for (let i = 0; i < articles.length; i++) {
          output = articles[i].article +
            " for "+ articles[i].price + "EUR";        
            sumreceipt += articles[i].price;
          // document.getElementById("total").innerText = "Total " + sumreceipt.toFixed(2) + " EUR";
          const list_item = document.createElement('li');
          // list_item.classList.add('article');
          list_item.innerText = output;
          receipt_list.appendChild(list_item);         
        };
        const list_item = document.createElement('li');
        list_item.innerText = "\n"+"Total :" + sum.toFixed(2) + " EUR  - Thank you for your purchase.";
        receipt_list.appendChild(list_item); 
      };
    };
    xhttp.open("GET", "database.json", true);
    xhttp.send();


  } else {    
    alert(`Please pay enough money, minimum ${sum.toFixed(2)} EUR.`); // not enough money!
    input.value = ""; // reset of payment input of user
    return
  }
});


var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // runs only with live server
    // console.log(xhttp.responseText);

    // transfer the response from JSON into object
    var response = JSON.parse(xhttp.responseText);
    // console.log(response);

    var articles = response.articles;
    // console.log(articles); 

    for (let i = 0; i < articles.length; i++) {
      // console.log(articles[i].article);

      setTimeout(() => {
        // console.warn(i);

        // ######### innerHTML method ####################
        // output +=
        //   "<li>" + articles[i].article +
        //   " --------"+articles[i].price+ " EUR" + "</li>";
        //   console.log(output);
        // document.getElementById("scanned").innerHTML = output;

        output = articles[i].article +
          " --------------"+ articles[i].price + "EUR";
        
        sum += articles[i].price;
        document.getElementById("total").innerText = "Total " + sum.toFixed(2) + " EUR";

        const list_item = document.createElement('li');
        list_item.classList.add('article');
        list_item.innerText = output;
        list_box.appendChild(list_item);

      }, i*1000); // delay of 1 sec. in each cycle of the for loop.
      // see https://www.youtube.com/watch?v=hPYKtvrIBtA or https://www.youtube.com/watch?v=-wkczVnAO3Y 
    };
  };

};
// instead of local file "people.json" you can enter URL of API
xhttp.open("GET", "database.json", true);
xhttp.send();