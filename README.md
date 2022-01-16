# JpegJS


Read, manipulate, write, encode and decode image data.

# Installation

This module is installed via npm:

```shell
npm install jpg-js
```

# Contents

<ul>
  <li><a href="#importing">Importing</a></li>
  <li><a href="#Open/Load-image">Open/Load Image </a></li>
  <li><a href="#resize">Resize image</a></li>
  <li><a href="#crop">Crop image</a></li>
</ul>


<h1 id="importing">Importing</h1>


```javascript
const Image = require('jpg-js');
```

<h2 id="Open/Load-image">Open/Load image</h2>

To load a image, use open function :

```javascript
const Image = require('jpg-js');

const img = Image.open('img.jpg');
console.log(img);

/*
Image {
  height: 664,
  width: 1601,
  data: <Buffer 92 01 12 ff 72 00 12 ff 66 00 10 ff 5c 00 0d ff 12 ff 78 00 ... 4252206 more bytes>
}
*/

```

<h2 id="resize">Resize image</h2>

```javascript
const Image = require("jpg-js")

const img = Image.open("img.jpg")

//Resize a image to width:1500 & height:1000
img.resize(1500,1000)

//Saving processed image as image.jpg
img.save("image.jpg")

```

**Actual Image (img.jpg)**  &nbsp;  **Size: 664 x 1601**

![img](https://user-images.githubusercontent.com/88069082/149673405-b47f71c1-0777-4038-9247-5b0c9d166f22.jpg)


**Resized Image (image.jpg)**  &nbsp;  **Size: 1000 x 1500**

![image](https://user-images.githubusercontent.com/88069082/149673401-6ab5bd5b-82ca-40df-9999-b17b92d65b3e.jpg)

<h2 id="crop">Crop image</h2>

```javascript
const Image = require("jpg-js")

const img = Image.open("img.jpeg")

//Crop a image left:0 , upper:0 , right:300 , low:200
img.crop([0,0,300,200])

//Saving processed image as image.jpeg
img.save("image.jpeg")
```

**Actual Image (img.jpeg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149674079-68f1d7b2-f8b7-4c74-972f-6f45b38198ca.jpeg"/>
</p> 

**Crop Image (image.jpeg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149674077-ff5f7ccf-9445-4043-97bf-79b9c14de31d.jpeg"/>
</p> 




<!-- 
<p align="center">
  <img src="https://github.com/Satyam-2001/Jpg-js/blob/main/Assets/image.jpg?raw=true" height="250px"/>
</p> -->
