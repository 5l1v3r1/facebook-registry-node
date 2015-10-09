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
var options = new chrome.Options.fromCapabilities(webdriver.Capabilities.chrome()).addArguments(
		// 'proxy=127.0.0.1:9150',
		// 'proxy-type=socks5',
		'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.6 Safari/537.11"'
	);
var caps = options.toCapabilities();
caps.SetCapability
// console.log('caps', caps);

function getBrowser(){
	var browser = new webdriver.Builder()
		.withCapabilities(caps)
		// .setProxy({
		// 	'proxyType': 'MANUAL',
		// 	'socksProxy': '127.0.0.1:9150',
		// 	'noProxy':''
		// })
		// .setProxy(proxy.manual({
		// 	http: '192.168.0.1:8080'
		// }))
		.build();
	return browser;
};

function newUserProfile(){
	var birthday = {
		day: Math.floor(Math.random()*28 + 1),
		month: Math.floor(Math.random()*12 + 1),
		year: Math.floor(Math.random()*12 + 1988),
		salt: Math.floor(Math.random()*1000),
	};
	var user = {
		ho: USER_INFO['ho'][Math.floor(Math.random()*USER_INFO['ho'].length)],
		dem: USER_INFO['dem'][Math.floor(Math.random()*USER_INFO['dem'].length)],
		ten: USER_INFO['ten'][Math.floor(Math.random()*USER_INFO['ten'].length)]
	};

	user.user = [user.ho, user.dem, user.ten].join('').toLowerCase();
	user.pass = [user.user, ':">..'].join('');
	user.email = [user.user, birthday.day, birthday.month, birthday.year, birthday.salt, '@gmail.com'].join('');
	return {
		user: user,
		birthday: birthday
	};
};


function registry(browser, options){
	browser.get('https://www.facebook.com/');
	var form = browser.findElement(By.css('form#reg'));
	form.findElement(By.css('input[name=lastname]')).sendKeys(options.user.ten);
	form.findElement(By.css('input[name=firstname]')).sendKeys(options.user.ho + ' ' + options.user.dem);
	form.findElement(By.css('input[name=reg_email__]')).sendKeys(options.user.email);
	form.findElement(By.css('input[name=reg_email_confirmation__]')).sendKeys(options.user.email);
	form.findElement(By.css('input[name=reg_passwd__]')).sendKeys(options.user.pass);
	form.findElement(By.css('select#day option[value="'+options.birthday.day+'"]')).click();
	form.findElement(By.css('select#month option[value="'+options.birthday.month+'"]')).click();
	form.findElement(By.css('select#year option[value="'+options.birthday.year+'"]')).click();
	form.findElement(By.css('input[name=sex][value="1"]')).click();
	// form.submit();
	form.findElement(By.css('[name=websubmit]')).click();
}

function isSuccess(browser, done){
	browser.sleep(5000)
	.then(function(){
		// console.log('html', browser.findElement(By.css('body')).getAttribute("innerHTML"));
		browser.findElement(By.css('body')).getAttribute("innerHTML").then(function(value) {
			console.log('value', value);
		});

		// browser.findElement(By.css('a#u_9_0')).click();
		return browser.findElements(By.css('[action*="/checkpoint"]'));
	})
	.then(function(checkpoint){
		console.log('checkpoint', checkpoint);
		if (checkpoint.length) {
			done('faile', checkpoint);
		}else{
			done();
		}
	});
	// browser.findElements(By.css('[action="checkpoint"]')).then(function(checkpoint){
	// 	console.log('checkpoint', checkpoint);
	// 	if (checkpoint.length) {
	// 		done('faile', checkpoint);
	// 	}else{
	// 		done();
	// 	}
	// });
}

function passStep1(browser){
	browser.findElement(By.css('a#u_9_0')).click();
}

function createProfile(){
	var profile = newUserProfile();
	console.log('profile', profile);
	var browser = getBrowser();
	browser.get('https://check.torproject.org/');
	// registry(browser, profile);
	// isSuccess(browser, function(err){
	// 	if (typeof err !== "undefined") {
	// 		console.log('out: ', err);
	// 		browser.quit();
	// 		// createProfile();
	// 	}else{
	// 		passStep1(browser);
	// 	}
	// });
}

createProfile();