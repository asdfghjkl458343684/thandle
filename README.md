#thandle

merge data for table inside column

##Example

* 1.You must provide a set of data,the following:
```javascript
    var j = [
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'black',x: true}, 'S', 2, 1, 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7],
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'black',x: true}, 'M', 1, '', 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7],
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'black',x: true}, 'L', '', '', 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7], 
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'white',x: true}, 'S', 3, '', 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7], 
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'white',x: true}, 'M', 2, '', 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7], 
    	[{val: 1,x: true}, {val: 'A1201111',x: true}, {val: 'Men\'s jacket',x: true}, {val: 'white',x: true}, 'L', '', '', 20, 3, 5, {val: '<img src="img/1.png" />',x: true},7]
    ];
```
`x:true`- x axis on behalf of rowspan

* 2.Then you use `thandle.format(j)` format data

</br></br>

* 3.The last.
```javascript
    var n = thandle.format(j);
    var trs = "";
    for(var i in n){
    	trs +="<tr>";
    	for(var j in n[i].getColumns()){
    		trs+='<td rowspan="'+n[i].get(j).rowspan+'">';
    		trs+=n[i].get(j).value;
    		trs+='</td>';
    	}
    	trs +="</tr>";
    }
    $(".data-table1").append(trs);
```
</br>
* 4.Let's take a look at the end
![](https://raw.githubusercontent.com/asdfghjkl458343684/thandle/master/test/img/preimg_1.png)
</br>
</br>

##Unfinished things.

* ####now,merge row war finished;but colspan is undefined.</br>

* ####I feel `thandle.format` provide of data not very friendly,I think allow `format` support double parameter,one original data,another is merge obj.</br>

* ####yes,you should see that 3 step. we should't allow reveal thandle inside of obj and properties.so,must add method handle DOM operation.</br>

above is my idea! what about you?
