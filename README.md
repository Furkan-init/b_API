Hw 1 implementation for CMPE 328 by Furkan Erkan
This is a REST Api project that has implemented by using node.js with mongoose and express packages. And Postman has used for testing purposes. I keep real id that given by MongoDB intentionally to show objects are unique. However, I didn't use them to be more practical.

Firstly, you can reach deployed version of my code from (When the first time of reaching, there can be 5-10 seconds waiting) :
https://salty-tor-46351.herokuapp.com/api/user

Secondly, application performs CRUD operations by using GET, POST, PUT and DELETE Http methods.

For GET method, there are two options which are sending whole users or specificic user that given in request by id as parameter from database.

With "api/user"

<img width="862" alt="Screen Shot 2021-03-18 at 14 16 34" src="https://user-images.githubusercontent.com/80795739/111619934-2c9b9e00-87f7-11eb-95b3-13cc8c4ead90.png">
<img width="651" alt="Screen Shot 2021-03-18 at 14 18 37" src="https://user-images.githubusercontent.com/80795739/111619995-3cb37d80-87f7-11eb-9e6a-bcf604f48e50.png">

With "api/user/:id"

<img width="955" alt="Screen Shot 2021-03-18 at 14 19 28" src="https://user-images.githubusercontent.com/80795739/111620015-4341f500-87f7-11eb-98a9-42895d7bd955.png">
<img width="648" alt="Screen Shot 2021-03-18 at 14 19 03" src="https://user-images.githubusercontent.com/80795739/111620024-44732200-87f7-11eb-9fec-3cbd98344959.png">

POST method adds user into cloud database. However, If there is an attempt to add a user that already has same id or by missing information, it will return HTTP 400 error code. 
Proper way to add:

Ekran görüntüsü 2021-03-18 145717](https://user-images.githubusercontent.com/80795739/111623986-26f48700-87fc-11eb-9409-e7f99b046219.png)

