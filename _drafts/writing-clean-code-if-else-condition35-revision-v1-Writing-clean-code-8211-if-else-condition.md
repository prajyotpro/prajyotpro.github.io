---
id: 102
title: 'Writing clean code &#8211; if, else condition'
date: '2018-04-13T06:05:50+00:00'
author: 'Prajyot Khandeparkar'
layout: revision
guid: 'http://www.prajyotkhandeparkar.com/index.php/2018/04/13/35-revision-v1/'
permalink: '/?p=102'
---

While writing code, at a point of time we come to certian situations where we need to handle multiple conditions. We (Developers) mostly tend to use IF’s and ELSE’s and ELSEIF’s to handle these conditions. And then while handling lots of conditions we tend to mess up and complicate the code, making it difficult to read.

Let me show you a simple example of difficult to read code.

### Use of if

```
router.post('/login', function(request, response) {
    if (request.boby != undefined && checkingFields(request.body)) {
        // checkFields – to check/validate if fields for login are present
        // Call user model function which returns array of matched user
        user.login(request.body, function(error, result) {
            if (result.length > 0) {
            // Check if user is active
                if (result[0].is_active == 1) {
                    console.log("Login Success!");
                    return true;
                } else {
                    console.log("User inactive, please check email from account activation!");
                    return false;
                }
`           } else if (error) {
                console.log(error);
                return false;
            } else {
                console.log("Incorrect username/password!, please try again");
                return false;
            }
        });
    } else {
        console.log("Please fill in details correctly!");
        return false;
    }
});
```

Assuming above code will work perfectly. But is it easy to ready? I still get messed up with IF’s and ELSE’s in it. Do you? Further if we need to handle more conditions then it will be very difficult to figure out what exactly we want to achieve. Let me show you an example how we can handle the above code. Which should be much easier to read and cleaner. In this method we check for invalid data first and return, rather then moving forward with not necessary code execution.

```
router.post('/login', function(request, response) {
	// Check if data posted is valid or return false right away
	if (request.body == undefined || !checkingFields(request.body)) {
		console.log("Please fill in details correctly!");
		return false;
	}

	// If everything is right in above code we continue wihtout exit
	// Now we move to next step for login
	user.login(request.body, function(error, result) {
		// Exit in case of error
		if (error) {
			console.log(error);
			return false;
		}

		if (result.length <= 0) {
			console.log("Incorrect username/password!, please try again");
			return false;
		}

		if (result[0].is_active != 1) {
			console.log("User inactive, please check email from account activation!");
			return false;
		}

		// Login success!! :)
		console.log("Login Success!");
		return true;

	});
});
```

So simple and easy to read.


### Use of switch

Let’s say we need to execute function based on different options.

```
// Option  - string
var initFileFunction = function(option) {
	if (option == 'copy') {
		return copyFile();
	} else if (option == 'move') {
		return moveFile();
	} else if (option == 'print') {
		return printFile();
	} else {
		return deleteFile();
	}
}
```

In such case we can make use of **switch**

```
var initFileFunction = function(option) {
	switch(option) {
		case 'copy' :
			return copyFile();
			break;
		case 'move' :
			return moveFile();
			break;
		case 'print' :
			return printFile();
			break;
		default :
			return deleteFile();
			break;
	} 
}
```

Much easier to read and works faster as well. And if you miss out a case – it will be handled as default case.


### Conditional ternary operators

Operators makes code of conditions very compact.

```
var marks = 55;
var result = (marks >= 40) ? "Passes" : "Fails";
console.log(result);
```

Learn more on ternary : [https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional\_Operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) That’s it folks. That is how I code. Feel free to comment and share how you handle such situations. Thanks for reading. Chao!!