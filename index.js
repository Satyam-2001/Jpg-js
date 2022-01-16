const encode = require("./lib/encode");
const decode = require("./lib/decode");
const fs = require("fs");


class Image{
    constructor(filename){
        if(filename){
            const img = decode(fs.readFileSync(filename));
            this.height = img.height;
            this.width = img.width;
            this.data = img.data;
        }
    }
    resize(width,height){
        const gapw = this.width / width;
        const gaph = this.height / height;
        const tempData = new Buffer.alloc(width*height*4);
        for(let i = 0 ; i < height ; i++){
            const rowtemp = i*width*4;
            const row = 4*this.width*Math.floor(i*gaph);
            for(let j = 0 ; j < width ; j++){
                const jumphTemp = rowtemp + j*4;
                const jumph = row + 4*Math.floor(j*gapw);
                tempData[jumphTemp] = this.data[jumph];
                tempData[jumphTemp+1] = this.data[jumph+1];
                tempData[jumphTemp+2] = this.data[jumph+2];
                tempData[jumphTemp+3] = this.data[jumph+3];
            }
        }
        this.data = tempData;
        this.width = width;
        this.height = height;
    }
    crop(left,upper,right,low){
        if(left >= right || upper >= low)
            throw new Error("Arrange parameter left,upper,right,low accordingly!!");
        if(left < 0 || right>this.width || upper<0 || low>this.height)
            throw new Error("size of crop image cannot exceed original size");
        const height = low - upper;
        const width = right - left;
        const tempData = new Buffer.alloc(width*height*4);
        for(let i = 0 ; i < height ; i++){
            const rowtemp = i*width*4;
            const row = (upper+i)*this.width*4 + left*4;
            for(let j = 0 ; j < width ; j++){
                const jumphTemp = rowtemp + j*4;
                const jumph = row + j*4;
                tempData[jumphTemp] = this.data[jumph];
                tempData[jumphTemp+1] = this.data[jumph+1];
                tempData[jumphTemp+2] = this.data[jumph+2];
                tempData[jumphTemp+3] = this.data[jumph+3];
            }
        }
        this.data = tempData;
        this.width = width;
        this.height = height;
    }
    flip_vertical(){
        for(let i = 0 ; i < this.height/2 ; i++){
            const row = i*this.width*4;
            for(let j = 0 ; j < this.width*4 ; j++){
                const temp = this.data[row + j];
                this.data[row + j] = this.data[(this.height-i-1)*this.width*4 + j];
                this.data[(this.height-i-1)*this.width*4 + j] = temp;
            }
        }
    }
    flip_horizontal(){
        for(let i = 0 ; i < this.height ; i++){
            const row = i*this.width*4;
            for(let j = 0 ; j < this.width/2 ; j++){
                const j4 = row + j*4;
                const rev = row + (this.width - j)*4;
                const temp = [this.data[j4],this.data[j4+1],this.data[j4+2],this.data[j4+3]];
                [this.data[j4],this.data[j4+1],this.data[j4+2],this.data[j4+3]] = [this.data[rev-4],this.data[rev-3],this.data[rev-2],this.data[rev-1]];
                [this.data[rev-4],this.data[rev-3],this.data[rev-2],this.data[rev-1]] = temp;
            }
        }
    }
    rotate(){
        const tempData = new Buffer.alloc(this.width*this.height*4);
        for(let i = 0 ; i < this.height ; i++){
            const gap = (this.height - i - 1) * 4;
            const jump = this.height * 4;
            const row = i * this.width * 4;
            for(let j = 0 ; j < this.width ; j++){ 
                const current = row + j * 4;
                const currentTemp = gap + j * jump;
                tempData[currentTemp] = this.data[current]
                tempData[currentTemp + 1] = this.data[current + 1]
                tempData[currentTemp + 2] = this.data[current + 2]
                tempData[currentTemp + 3] = this.data[current + 3]
            }
        }
        this.data = tempData;
        const temp = this.height;
        this.height = this.width;
        this.width = temp;
    }
    greyscale(){
        for(let i = 0 ; i < this.height ; i++){
            const row = i * this.width * 4;
            for(let j = 0 ; j < this.width ; j++){ 
                const current = row + j * 4;
                const sum = this.data[current] + this.data[current+1] + this.data[current+2]
                const value = Math.round(sum/3)
                this.data[current] = this.data[current+1] = this.data[current+2] = value 
            }
        }
    }
    rectangle([left,upper,right,low],color){
        if(left >= right || upper >= low)
            throw new Error("Arrange parameter left,upper,right,low accordingly!!");
        if(left < 0 || right>this.width || upper<0 || low>this.height)
            throw new Error("size of rectangle exceeds original size");
        for(let i = upper ; i < low ; i++){
            const row = i * this.width * 4;
            for(let j = left ; j < right ; j++){
                const jumph = row + j*4;
                this.data[jumph] = color[0];
                this.data[jumph+1] = color[1];
                this.data[jumph+2] = color[2];
            }
        }
    }
    setOpacity(value){
        const opacity = Math.round(255*value);
        for(let i = 0 ; i < this.height ; i++){
            const row = i*this.width*4;
            for(let j = 0 ; j < this.width ; j++){
                this.data[row + j*4 + 3] = opacity;
            }
        }
    }
    decodedData(){
        const imageData = {
            height : this.height,
            width : this.width,
            data : this.data
        }
        return imageData;
    }
    encodedData(){
        return encode(this.decodedData(),100).data;
    }
    save(filename){
        fs.writeFileSync(filename, this.encodedData());
    }
}

function open(filename) {
    const img = new Image(filename);
    return img;
}

function fromarray(data,width,height){
    if(data && width && height){
        const img = new Image();
        img.height = height;
        img.width = width;
        img.data = data;
        return img;
    }
    throw new Error("Object should contain height,width,data!!")
}

module.exports = {open,fromarray};