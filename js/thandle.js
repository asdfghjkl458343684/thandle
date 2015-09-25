/**
 * 表格多列排序plugin
 * @param {Object} global
 */
(function(global) {
	var _sort = Array.prototype.sort,
		_unshift = Array.prototype.unshift;
	config = {
		compare: "gt"
	}

	function sortExe(d, rs, __i) {

		var nd = [],
			__max = rs.length - 1;
		for (var i = 0; i < d.length; i++) {
			__sort(d[i], rs[__i]);
			if (d[i].length === 1 || __max === __i) {
				sortMerge(nd, d[i]);
			} else {
				sortMerge(nd, sortExe(splitArray(d[i], rs[__i]), rs, __i + 1));
			}
		}
		return nd;
	}

	/**
	 * 合并数组
	 * @param {Object} a 主数组
	 * @param {Object} b 被合并数组
	 */
	function sortMerge(a, b) {
		_unshift.apply(a, b);
	}

	/**
	 * 排序
	 * @param {Object} d
	 * @param {Object} __i
	 */
	function __sort(d, __i) {
		//		/lt/.test(config.compare) ? _sort.call(d, __ltSort) : _sort.call(d, __gtSort);
		if (/lt/.test(config.compare)) {	//从大到小排序
			_sort.call(d, function() {
				if (arguments[0][__i] < arguments[1][__i])
					return 1;
				return -1;
			});
		} else {
			_sort.call(d, function() {		//从小到大排序
				if (arguments[0][__i] > arguments[1][__i])
					return 1;
				return -1;
			});
		}
	}

	function __ltSort() {
		if (arguments[0][__i] < arguments[1][__i])
			return 1;
		return -1;
	}

	function __gtSort() {
		if (arguments[0][__i] > arguments[1][__i])
			return 1;
		return -1;
	}

	function splitArray(d, __i) {
		if (d.length === 1)
			return [d];
		var _tem = [],
			__tem = [];
		for (var i = 0; i < d.length; i++) {
			if (!!d[i + 1] && d[i][__i] === d[i + 1][__i]) {
				__tem.unshift(d[i]);
				continue;
			}
			if (!!d[i - 1] && d[i][__i] === d[i - 1][__i])
				__tem.unshift(d[i]);
			else
				__tem = [d[i]];
			_tem.unshift(__tem);
			__tem = [];
		}
		return _tem;
	}

	global.tsort = function() {
		if (!arguments[0].rowspan || !arguments[0].data || arguments[0].data.length === 0 || arguments[0].rowspan.length === 0)
			return;
		var rs = arguments[0].rowspan,
			d = arguments[0].data
		config.compare = !!arguments[0].compare ? "lt" : config.compare; //lt小于   gt大于默认gt;
		__sort(d, rs[0]);
		var nd = sortExe(splitArray(d, rs[0]), rs, 1);
		return nd;
	}
})(window);
(function(global) {
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
			rowspan: [],
			colspan: [],
			__all: false
		},
		contain = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (val === this[i])
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
	var Column = function(_value, _x, _y) {
			this.colspan = 1;
			this.rowspan = 1;
			this.id = uuid();
			this.value = _value;
			this.__x = _x > -1 ? _x : Increment(this.id + "x");
			this.__y = _y > -1 ? _y : Increment(this.id + "y");
		}
		//列对象克隆
	Column.prototype.clone = function() {
		var copyObj = new Column(this.value, this.__x, this.__y);
		return copyObj;
	}

	var Row = function(rownum) {
		this.columns = [];
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

	global.thandle = {
		format(_options) {
			var data = _options.data || _options || options.data,
				colspan = _options.colspan || options.colspan,
				rowspan = _options.rowspan || options.rowspan,
				row, //行对象
				col, //列对象
				prevRow, //第一行数据
				n = [], //格式化以后的数据
				i, //行索引
				j; //列索引
			if (_options.sort === true)
				data = tsort(arguments[0]);
			for (i = 0; i < data.length; i++) {
				//1、使用空的一行记录新纪录行
				row = new Row(i);
				//2、对比列，记录可合并的最新列
				if (n.length == 1) prevRow = n[0].clone();
				//3、遍历列
				for (j = 0; j < data[i].length; j++) {
					//	4、如果当前列与对比列相同，则在新数据集合中更新rowspan属性
					//	否则更新对应对比列的对象为最新
					if (!!prevRow && !!prevRow.get(j) && !!rowspan.contain(j) && prevRow.get(j).value === data[i][j]) {
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