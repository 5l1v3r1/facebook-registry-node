#!/usr/bin/env node

// http://code.tutsplus.com/tutorials/an-introduction-to-webdriver-using-the-javascript-bindings--cms-21855
// https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebElement.html#sendKeys

var webdriver = require('selenium-webdriver'),
	chrome = require('selenium-webdriver/chrome'),
	proxy = require('selenium-webdriver/proxy'),
	path = require('chromedriver').path,
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until;



var USER_INFO = {
	"ho": ["Nguyen","Hoang","Phan","Pham", "Ho","Le","Truong","Dinh", "Bui", "Tran", "Do", "Vo", "Luong"],
	"dem": ["Thi","Hoang","Thuy","Tuyet","Thu","Kim","Thanh","Ngoc","Kieu","Anh","Phuong", "Tuong"],
	"ten": ["Duong","Linh","Thuy","Thu","Tuyet","Tien","Hue","Hanh","Uyen",
			"Duyen","Chau","Huyen","Huong","Trinh","Truc","Trang","Hong","Mai",
			"Luong", 'Huong', "Nhung", "Linh", "Ngan","Thanh","Nguyet","Quynh",
			"Thao","Bich","Lien","Tram","Anh","Kieu","Diem","Phuong","Dung","Nhu",
			"Anh","Hang","Bich"]
	};

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// https://code.google.com/p/selenium/source/browse/javascript/node/selenium-webdriver/test/chrome/options_test.js#197
var options = new chrome.Options().addArguments(['user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.6 Safari/537.11']);
var caps = options.toCapabilities();
// console.log('caps', caps);

var browser = new webdriver.Builder()
	.withCapabilities(caps)
	// .setProxy(proxy.manual({
	// 	http: '192.168.0.1:8080'
	// }))
	.build();




browser.get('https://www.facebook.com/');
browser.findElement(By.css('input[name=lastname]')).sendKeys('Last Name');
browser.findElement(By.css('input[name=firstname]')).sendKeys('First Name');
browser.findElement(By.css('input[name=reg_email__]')).sendKeys('Email@gmail.com');
browser.findElement(By.css('input[name=reg_email_confirmation__]')).sendKeys('Email@gmail.com');
browser.findElement(By.css('input[name=reg_passwd__]')).sendKeys('123abc!@#');
browser.findElement(By.css('select[name=birthday_day]')).selectByValue('2');
browser.findElement(By.css('select[name=birthday_month]')).sendKeys("9");
browser.findElement(By.css('select[name=birthday_year]')).sendKeys("1993");
browser.findElement(By.css('input[name=sex][value=1]')).click();


// var form = driver.findElement(By.css('form'));
// var element = form.findElement(By.css('input[type=file]'));
// element.sendKeys('/path/to/file.txt');
// form.submit();
// browser.findElements(webdriver.By.css('[href^="/wiki/"]')).then(function(links){
// 	console.log('Found', links.length, 'Wiki links.' )
// 	// browser.quit();
// });
