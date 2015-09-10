(function(w) {
	//		data = [
	//			[1,2,3,4,7],
	//			[1,2,3,4,7],
	//			[1,2,3,4,7]
	//		];
	//		mergeObj = {
	//			rowspan:[1,2,4],
	//			colspan:[1,4,6]
	//		}
	var options = {
			data: [],
			mergeObj: {
				rowspan: [],
				colspan: []
			}
		},
		contain = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (val == this[i])
					return true;
			}
		},
		uuid = function() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++)
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			s[14] = "4";
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		},
		Increment = (function() {
			var uuids = {};
			return function(uuid, clear) {
				uuids[uuid] = clear ? 0 : uuids[uuid] || 0;
				return ++uuids[uuid];
			}
		})();
	Array.prototype.contain = contain;
	//	//深度克隆
	//	function deepClone(obj) {
	//
	//		var _obj = obj instanceof Array ? [] : {};
	//		if (!!obj) {
	//			for (var i in obj) {
	//				if (!!obj && typeof obj === "object")
	//					_obj[i] = obj[i];
	//				else
	//					_obj[i] = deepClone(_obj);
	//			}
	//		}
	//		return _obj;
	//	}
	var Column = function(__value, _x, _y) {
			this.colspan = 1;
			this.rowspan = 1;
			this.id = uuid();
			this.value = __value;
			this.__x = _x > -1 ? _x : Increment(this.id + "x");
			this.__y = _y > -1 ? _y : Increment(this.id + "y");
		}
		//列对象克隆
	Column.prototype.clone = function() {
		var copyObj = new Column(this.value, this.__x, this.__y);
		return copyObj;
	}

	var Row = function(rownum) {
		this.columns = [],
			this.rownum = rownum;
	}

	Row.prototype.push = function(col, __index) { //插入或者添加一列
		if (!!__index)
			this.columns[__index] = col;
		else
			this.columns.push(col);
		return this;
	}
	Row.prototype.getColumns = function() { //get Column集合
		return this.columns;
	}
	Row.prototype.get = function(__index) { //get 行中指定列对象
		return this.columns[__index];
	}
	Row.prototype.find = function(x) { //通过坐标查找列对象
		for (var i in this.columns)
			if (this.columns[i].__x === x)
				return this.columns[i];
	}
	Row.prototype.clone = function() { //行对象克隆
		var copyObj = new Row(this.rownum);
		for (var i = 0; i < this.columns.length; i++)
			copyObj.push(this.columns[i].clone());
		return copyObj;
	}
	w.thandle = {
		format(_options) {
			var data = _options.data || _options || options.data,
				mergeObj = _options.merge || options.mergeObj,
				row, //行对象
				col, //列对象
				prevRow, //第一行数据
				n = [], //格式化以后的数据
				i, //行索引
				j; //列索引
			for (i = 0; i < data.length; i++) {
				//1、使用空的一行记录新纪录行
				row = new Row(i);
				//2、对比列，记录可合并的最新列
				if (n.length == 1) prevRow = n[0].clone();
				//3、遍历列
				for (j = 0; j < data[i].length; j++) {
					//	4、如果当前列与对比列相同，则在新数据集合中更新rowspan属性
					//	否则更新对应对比列的对象为最新
					if (!!prevRow && !!prevRow.get(j) && !!mergeObj.rowspan.contain(j) && prevRow.get(j).value === data[i][j]) {
						var x = prevRow.get(j).__x, //相同行的列坐标
							y = prevRow.get(j).__y; //相同行坐标
						++n[y].find(x).rowspan; //根据x,y坐标找到列对象更新数据
					} else {
						col = new Column(data[i][j], j, i);
						if (!!prevRow) //对比列不为空的时候更新没有合并的列让下一次可以对比最新的对象 
							prevRow.push(col.clone(), j);
						row.push(col);
					}
				}
				n.push(row);
			}
			return n;
		}
	};
})(window)