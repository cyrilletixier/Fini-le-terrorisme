/*
 * Trump Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Donald Trump from the web page.
 */

// Variables
var regex = /terrorisme/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Terror with Mild filter...");
	return $(":contains('terrorisme'),:contains('terroriste'), :contains('attentat'), :contains('terreur')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Terror with Default filter...");
	return $(":contains('terrorisme'),:contains('terroriste'), :contains('attentat'), :contains('terreur'), :contains('islamiste'), :contains('radicalisé')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering Terror with Vindictive filter...");
	return $(":contains('terrorisme'),:contains('terroriste'), :contains('attentat'), :contains('terreur'),  :contains('islamiste'), :contains('radicalisé'), :contains('cazeneuve'), :contains('bataclan')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "leger") {
	   return filterMild();
   } else if (filter == "radical") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Terroriste trouvé dans cette page, on cherche a le supprimer !");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", terror: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " terror."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
