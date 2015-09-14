# thandle 
`javascript`
###### What can it do?

  Thandle is a use of native javascript implementation form data procession automerge plug-in, as long as you tell it what columns are needed, it can help you put the original data processing object into a simple json format. Finally, you only need to do a simple traversal can form data merging.

###### Usage
		thandle.formate({
          data:[],
          colspan:[],
          rowspan:[],
          all:true
        });
###### Example
```javascript
var j = [
          ['1', 'A1201111', 'Men\'s jacket', 'black', 'S', 2, 1, 20, 3, 5, '<img src="img/1.png" />',7],
          ['1', 'A1201111', 'Men\'s jacket', 'black', 'M', 1, '', 20, 3, 5, '<img src="img/1.png" />',7],
          ['1', 'A1201111', 'Men\'s jacket', 'black', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
          ['1', 'A1201111', 'Men\'s jacket', 'white', 'S', 3, '', 20, 3, 5, '<img src="img/1.png" />',7], 
          ['1', 'A1201111', 'Men\'s jacket', 'white', 'M', 2, '', 20, 3, 5, '<img src="img/1.png" />',7], 
          ['1', 'A1201111', 'Men\'s jacket', 'white', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7]
		];
   		var n = thandle.format({data:j,colspan:[0,1,2,3,4,10]});
        var trs = "";
        for(var i=0;i<n.length;i++){
          trs +="<tr>";
          for(var j=0;j<n[i].getColumns().length;j++){
            trs+='<td rowspan="'+n[i].get(j).rowspan+'">';
            trs+=n[i].get(j).value;
            trs+='</td>';
          }
          trs +="</tr>";
        }
        $(".data-table1").append(trs);
```
[![alt text](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/preimg_1.png?raw=true)](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/preimg_1.png?raw=true)
