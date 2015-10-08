# thandle 

###### What can it do?

  Thandle is a use of native javascript implementation form data procession automerge plug-in, as long as you tell it what columns are needed, it can help you put the original data processing object into a simple json format. Finally, you only need to do a simple traversal can form data merging.

###### Usage
		thandle.formate({
          data:[],
          rowspan:[],
          sort:true	//need tsort plug-in
        });
`thandle` has two native parameters:
* data - original data
* rowspan - need merge rows of columns
###### Example
```javascript
var j = [
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'M', 1, '', 20, 3, 5, '<img src="img/1.png" />',7],
        ['1', 'A1201111', 'Men\'s jacket', 'white', 'S', 3, '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'S', 2, 1, 20, 3, 5, '<img src="img/1.png" />',7],
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'white', 'M', 2, '', 20, 3, 5, '<img src="img/1.png" />',7],
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'M', 1, '', 20, 3, 5, '<img src="img/1.png" />',7],
        ['1', 'A1201111', 'Men\'s jacket', 'white', 'S', 3, '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'S', 2, 1, 20, 3, 5, '<img src="img/1.png" />',7],
        ['1', 'A1201111', 'Men\'s jacket', 'black', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'red', 'M', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'red', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'red', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'red', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7], 
        ['1', 'A1201111', 'Men\'s jacket', 'white', 'L', '', '', 20, 3, 5, '<img src="img/1.png" />',7]
      ];
   		var n = thandle.format({data:j,rowspan:[0,1,2,3,4,10]});
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
</br>
## Update v1.1 
#### add plug-in `tsort`
	I gave thandle master feature added a sort plug-in,it can sort for original data.
  
##### How tsort sort
	"tsort" sort rule from `rowspan` property in get columns index,from left to right in sort.so,`rowspan` property in of value order does not affect thandle process data, but affect the sort order.
 then by thandle proceed at work.final,you need set property sort of value is true,just ok!

## Remove something
* v1.0 no colspan property(I think nobodye use colspan feature. Originally, there is no implementation,also)
* v1.0 no all property

##Result

#### sort befot
[![sort before](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/before.png)](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/preimg_1.png)

#### sort after
[![sort before](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/after.png)](https://github.com/asdfghjkl458343684/thandle/blob/master/test/img/preimg_1.png)
