## Hw 1 implementation for CMPE 328 by Furkan Erkan

That is a REST Api project that has implemented by using node.js with mongoose and express packages. In addition, Postman has used for testing purposes. I kept real id that given by MongoDB intentionally to show objects are unique. However, I didn't use them to be more practical.

Firstly, you can reach deployed version of my code from (When the first time of reaching, there can be 5-10 seconds of waiting) :
https://salty-tor-46351.herokuapp.com/api/user

Secondly, application performs CRUD operations by using GET, POST, PUT and DELETE Http methods.


### GET method gets all users that exist on database currently or specific user which has given as a request parameter. However, If there is an attempt to add a user with non-integer request parameter -e.g. "api/user/Nandor" instead of "api/user/1"-, app will return HTTP 400 error code. Also, If there is no valid id in the request parameter, app will return HTTP 404 error code.

With "api/user"

<img width="862" alt="Screen Shot 2021-03-18 at 14 16 34" src="https://user-images.githubusercontent.com/80795739/111619934-2c9b9e00-87f7-11eb-95b3-13cc8c4ead90.png">
<img width="651" alt="Screen Shot 2021-03-18 at 14 18 37" src="https://user-images.githubusercontent.com/80795739/111619995-3cb37d80-87f7-11eb-9e6a-bcf604f48e50.png">

With "api/user/:id"

<img width="955" alt="Screen Shot 2021-03-18 at 14 19 28" src="https://user-images.githubusercontent.com/80795739/111620015-4341f500-87f7-11eb-98a9-42895d7bd955.png">
<img width="648" alt="Screen Shot 2021-03-18 at 14 19 03" src="https://user-images.githubusercontent.com/80795739/111620024-44732200-87f7-11eb-9fec-3cbd98344959.png">

HTTP 400 Bad Request Error:
<img width="960" alt="Screen Shot 2021-03-19 at 05 22 12" src="https://user-images.githubusercontent.com/80795739/111722572-277c3480-8873-11eb-9504-3ad33bb8a186.png">

HTTP 404 Not Found Error:
<img width="960" alt="Screen Shot 2021-03-19 at 05 10 13" src="https://user-images.githubusercontent.com/80795739/111722484-fef43a80-8872-11eb-8ef9-c483d9143341.png">


### POST method adds user into cloud database. However, If there is an attempt to add a user that already has same id or by missing information, app will return HTTP 400 error code. 

Proper way to add:
<img width="958" alt="Screen Shot 2021-03-19 at 00 25 43" src="https://user-images.githubusercontent.com/80795739/111700062-f3404e00-8849-11eb-9b69-b44380364037.png">

Checking POST method from Heroku App:
![Ekran g??r??nt??s?? 2021-03-18 145717](https://user-images.githubusercontent.com/80795739/111625427-e433ae80-87fd-11eb-9246-d8bd3fc7c63e.png)

-HTTP 400 Bad Request Errors:
<img width="958" alt="Screen Shot 2021-03-18 at 14 58 02" src="https://user-images.githubusercontent.com/80795739/111625865-67ed9b00-87fe-11eb-9472-c7fa275b034a.png"><img width="958" alt="Screen Shot 2021-03-18 at 14 59 48" src="https://user-images.githubusercontent.com/80795739/111625895-6e7c1280-87fe-11eb-8177-e2f25035ebd3.png">


### PUT method updates user into cloud database and only required parameter is the id that given in request parameter. In addition, Implementation allows users to update partially when request id parameter is valid -e.g. "api/user/5"- instead of using PATCH method. However, If there is an attempt to add a user with non-integer request parameter -e.g. "api/user/Laszlo" instead of "api/user/5"-, app will return HTTP 400 error code. Also, If there is no valid id in the request body, app will return HTTP 400 error code.

Current users on database:
![Ekran g??r??nt??s?? 2021-03-18 1 put](https://user-images.githubusercontent.com/80795739/111705172-5bdef900-8851-11eb-8316-a3b7ba99d2a3.png)

Proper way to update:
<img width="960" alt="Screen Shot 2021-03-19 at 01 25 06" src="https://user-images.githubusercontent.com/80795739/111705820-5930d380-8852-11eb-9ea5-440cc629e8be.png">

Updated users on database:
![Ekran g??r??nt??s?? 2021-03-19 012622 updated](https://user-images.githubusercontent.com/80795739/111705679-271f7180-8852-11eb-9f0e-2c20a932437c.png)

Partial update example:
<img width="960" alt="Screen Shot 2021-03-19 at 05 56 46" src="https://user-images.githubusercontent.com/80795739/111725741-aaec5480-8878-11eb-96c2-5e505e9f80bb.png">

Partially updated user which has id:2 on database:
![Ekran g??r??nt??s?? 2021-03-19 055721](https://user-images.githubusercontent.com/80795739/111725806-ce170400-8878-11eb-9a2d-b1f651d1e14f.png)

-HTTP 400 Bad Request Error:
<img width="960" alt="Screen Shot 2021-03-19 at 05 51 35" src="https://user-images.githubusercontent.com/80795739/111725650-809a9700-8878-11eb-834a-be5d51f802c7.png">

-HTTP 404 Not Found Error:
<img width="960" alt="Screen Shot 2021-03-19 at 05 52 17" src="https://user-images.githubusercontent.com/80795739/111725679-8b552c00-8878-11eb-9d67-71d7e8a86776.png">


### DELETE method deletes user from cloud database and only required parameter is the id that given in request parameter. However, If there is an attempt to delete a user with non-integer request parameter -e.g. "api/user/Nadja" instead of "api/user/5"-, app will return HTTP 400 error code. Also, If there is no valid id in the request parameter, app will return HTTP 404 error code.

Current users on database:
![Ekran g??r??nt??s?? 2021-03-19 012622 updated](https://user-images.githubusercontent.com/80795739/111720541-23e6ae80-886f-11eb-8aba-688bb83344c7.png)

Proper way to delete:
<img width="960" alt="Screen Shot 2021-03-19 at 04 44 29" src="https://user-images.githubusercontent.com/80795739/111720592-424caa00-886f-11eb-8752-c420a4752a48.png">

After deleting the user that has id:4
![Ekran g??r??nt??s?? 2021-03-19-deleted](https://user-images.githubusercontent.com/80795739/111721014-23024c80-8870-11eb-9d61-e3ec82a562cd.png)

-HTTP 400 Bad Request Error:
<img width="960" alt="Screen Shot 2021-03-19 at 04 44 01" src="https://user-images.githubusercontent.com/80795739/111720628-585a6a80-886f-11eb-8eaa-c47bf83d16d5.png">

-HTTP 404 Not Found Error:
<img width="960" alt="Screen Shot 2021-03-19 at 04 43 13" src="https://user-images.githubusercontent.com/80795739/111720635-5abcc480-886f-11eb-9abb-55f2ed44ddda.png">
