# JpegJS


Read, manipulate, write, encode and decode image data.

# Installation

This module is installed via npm:

```shell
npm install jpg-js
```
# Author

<a href="https://github.com/Satyam-2001"> Satyam Lohiya </a>

# Contents

<ul>
  <li><a href="#importing">Importing</a></li>
  <li><a href="#Open/Load-image">Open/Load Image </a></li>
  <li><a href="#data">Decoded/Encoded Data</a></li>
  <li><a href="#resize">Resize image</a></li>
  <li><a href="#crop">Crop image</a></li>
  <li><a href="#grey">Greyscale image</a></li>
  <li><a href="#array">Image From Array</a></li>
  <li><a href="#rotate">Rotate Image</a></li>
  <li><a href="#flip">Flip Image</a></li>
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

<h2 id="data">Decoded/Encoded Data</h2>

```javascript
const Image = require("jpg-js");
const fs = require("fs");

img = Image.open("img.jpeg");

//Decoded Data
//also access by img.data
const decoded = img.decodedData();
console.log(decoded);
/*
{
  height: 384,
  width: 612,
  data: <Buffer 6d 53 50 ff 6d 53 50 ff 6e 53 50 ff 70 52 4e ff ... 939982 more bytes>
}
*/

//Enoded Data
const encoded = img.encodedData();
console.log(encoded);
/*
<Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 ... 269571 more bytes>
*/

//Saving encoded data back to jpeg
fs.writeFileSync("image.jpeg",encoded);

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

<h2 id="grey">Greyscale image</h2>

```javascript
const Image = require("jpg-js")

const img = Image.open("img.jpeg")

//Converting image to greyscale
img.greyscale()

//Saving processed image as image.jpeg
img.save("image.jpeg")!
```

**Actual Image (img.jpeg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149674420-9eee5d37-c4cc-4ca9-a542-a9628fc2f81d.jpeg" />
</p> 

**Greyscale Image (image.jpeg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149674418-7c18fe0e-0a47-4bca-97b9-a103cd28d7b7.jpeg" />
</p> 

<h2 id="array">Image From Array</h2>

```javascript
const Image = require("jpg-js");

//Creating a 1000 x 1000 size image
const height = 1000;
const width = 1000;

//Allocating Buffer for image data
const data = new Buffer.alloc(width * height * 4);

//Putting data into Buffer
for(let i = 0 ; i < height ; i++){
    const row = i * width * 4;
    for(let j = 0 ; j < width ; j++){
        const cell = row + j * 4;

        // Filling first-half with red
        if(i < height/2){
            data[cell] = 255;     // Red
            data[cell+1] = 0;     // Green
            data[cell+2] = 0;     // Blue
            data[cell+3] = 255;   // Alpha [ignore for jpeg]
        }

        // Filling secondt-half with green
        else{
            data[cell] = 0;       // Red
            data[cell+1] = 255;   // Green
            data[cell+2] = 0;     // Blue
            data[cell+3] = 255;   // Alpha [ignore for jpeg]
        }
    }
}

//Creating image from array
img = Image.fromarray(data,width,height);

//Saving image as image.jpeg
img.save("image.jpeg");
```

**image.jpeg** &nbsp; &nbsp; **Size : 1000 * 1000**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149675264-84e7d3d4-bc6b-470e-bc46-c22a3244d6cf.jpeg" height="500px"/>
</p> 


<h2 id="rotate">Rotate Image</h2>

```javascript
const Image = require("jpg-js");

img = Image.open("img.jpg");

//Rotating image clockwise
img.rotate();

//Saving processed image as image.jpg
img.save("image.jpg")
```

**Actual Image (img.jpg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149702536-10902d67-e4b2-4d4d-89bf-097a04286e93.jpg" height="350px"/>
</p> 

**Rotated Image (image.jpg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149702534-88d48d0d-d1c4-44d7-8fea-f81c382f4d90.jpg" height="800px"/>
</p> 

<h2 id="flip">Flip Image</h2>

```javascript
// Horizontal Flip
const Image = require("jpg-js");

img = Image.open("img.jpg");

//Flipping image horizontally
img.flip_horizontal();

//Saving processed image as horizontal.jpg
img.save("horizontal.jpg")
```

```javascript
// Vertical Flip
const Image = require("jpg-js");

img = Image.open("img.jpg");

//Flipping image vertically
img.flip_vertical();

//Saving processed image as vertical.jpg
img.save("vertical.jpg")
```

**Actual Image (img.jpg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149720631-7e31bd11-f739-4bc7-a065-7bd1f6101793.jpg"/>
</p> 


**Horizontal Flip Image (horizontal.jpg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149720628-95a2d5f2-2a62-464d-aa18-663de7b9c713.jpg"/>
</p> 


**Verticall Flip Image (vertical.jpg)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/88069082/149720894-58bda67d-dc11-4df3-a4f6-7d0124eb4718.jpg"/>
</p> 


## License

### Decoding

This library builds on the work of two other JPEG javascript libraries,
namely [jpgjs](https://github.com/notmasteryet/jpgjs) for the decoding
which is licensed under the Apache 2.0 License below:

Copyright 2011 notmasteryet

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### Encoding

The encoding is based off a port of the JPEG encoder in [as3corelib](https://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/images/JPGEncoder.as).

The port to Javascript was done by by Andreas Ritter, www.bytestrom.eu, 11/2009.

The Adobe License for the encoder is:

**Adobe**

Copyright (c) 2008, Adobe Systems Incorporated
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.

- Neither the name of Adobe Systems Incorporated nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*
