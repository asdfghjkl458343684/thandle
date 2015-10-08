/**
 * 表格多列排序plugin
 * @param {Object} global
 */
var tsort = (function(global) {
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
		if (/lt/.test(config.compare)) { //从大到小排序
			_sort.call(d, function() {
				if (arguments[0][__i] < arguments[1][__i])
					return 1;
				return -1;
			});
		} else {
			_sort.call(d, function() { //从小到大排序
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

	return function() {
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