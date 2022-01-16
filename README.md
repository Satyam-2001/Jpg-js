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
</ul>


<h1 id="importing">Importing⬆</h1>


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

![img.jpg](https://github.com/Satyam-2001/Jpg-js/blob/main/Assets/img.jpg?raw=true)


**Resized Image (image.jpg)**  &nbsp;  **Size: 1000 x 1500**

![image.jpg](https://github.com/Satyam-2001/Jpg-js/blob/main/Assets/image.jpg?raw=true)


<!-- 
<p align="center">
  <img src="https://github.com/Satyam-2001/Jpg-js/blob/main/Assets/image.jpg?raw=true" height="250px"/>
</p> -->
