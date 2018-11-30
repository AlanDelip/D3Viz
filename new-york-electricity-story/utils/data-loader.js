const d3 = require("d3");

export function loadData() {
	return d3.json("https://s3-us-west-2.amazonaws.com/alansite/resources/ny-load-1711-1810.json").then(res => res);
}

export const hourlyDataSet = {
	"hot-day-1": [{"hour": 0, "load": 23037.3}, {"hour": 1, "load": 21835.3}, {"hour": 2, "load": 20939.8}, {
		"hour": 3,
		"load": 20396.5
	}, {"hour": 4, "load": 20213.8}, {"hour": 5, "load": 20518.8}, {"hour": 6, "load": 21799.7}, {
		"hour": 7,
		"load": 23930.8
	}, {"hour": 8, "load": 25725.7}, {"hour": 9, "load": 27469.2}, {"hour": 10, "load": 28943.4}, {
		"hour": 11,
		"load": 29982.7
	}, {"hour": 12, "load": 30628.1}, {"hour": 13, "load": 31111.3}, {"hour": 14, "load": 31289.6}, {
		"hour": 15,
		"load": 31292.8
	}, {"hour": 16, "load": 31190.7}, {"hour": 17, "load": 31016.5}, {"hour": 18, "load": 30445.1}, {
		"hour": 19,
		"load": 29654.7
	}, {"hour": 20, "load": 28809.7}, {"hour": 21, "load": 28161}, {"hour": 22, "load": 26489.7}, {
		"hour": 23,
		"load": 24519.3
	}],
	"hot-day-2": [{"hour": 0, "load": 21354.9}, {"hour": 1, "load": 20372.3}, {"hour": 2, "load": 19635}, {
		"hour": 3,
		"load": 19209.4
	}, {"hour": 4, "load": 19192.5}, {"hour": 5, "load": 19772.7}, {"hour": 6, "load": 20886.8}, {
		"hour": 7,
		"load": 22719.8
	}, {"hour": 8, "load": 24492.8}, {"hour": 9, "load": 26091.3}, {"hour": 10, "load": 27622.5}, {
		"hour": 11,
		"load": 28851.1
	}, {"hour": 12, "load": 29809.3}, {"hour": 13, "load": 30538}, {"hour": 14, "load": 30888.6}, {
		"hour": 15,
		"load": 31077.3
	}, {"hour": 16, "load": 31247.7}, {"hour": 17, "load": 31166.1}, {"hour": 18, "load": 30564.7}, {
		"hour": 19,
		"load": 29753.1
	}, {"hour": 20, "load": 29193.8}, {"hour": 21, "load": 28117.9}, {"hour": 22, "load": 26165.4}, {
		"hour": 23,
		"load": 24114.9
	}],
	"cold-day-1": [{"hour": 0, "load": 19466.5}, {"hour": 1, "load": 18881.5}, {"hour": 2, "load": 18419.9}, {
		"hour": 3,
		"load": 18137.6
	}, {"hour": 4, "load": 18018}, {"hour": 5, "load": 18189.7}, {"hour": 6, "load": 18642.5}, {
		"hour": 7,
		"load": 19011
	}, {"hour": 8, "load": 19512.8}, {"hour": 9, "load": 20095.4}, {"hour": 10, "load": 20523.9}, {
		"hour": 11,
		"load": 20744.8
	}, {"hour": 12, "load": 20830.2}, {"hour": 13, "load": 20778.8}, {"hour": 14, "load": 20785.1}, {
		"hour": 15,
		"load": 21014.7
	}, {"hour": 16, "load": 21981.5}, {"hour": 17, "load": 23434.9}, {"hour": 18, "load": 23434.9}, {
		"hour": 19,
		"load": 23148.4
	}, {"hour": 20, "load": 22650.7}, {"hour": 21, "load": 21758.6}, {"hour": 22, "load": 20466.4}, {
		"hour": 23,
		"load": 19275.9
	}],
	"cold-day-2": [{"hour": 0, "load": 18311.1}, {"hour": 1, "load": 17781.9}, {"hour": 2, "load": 17450}, {
		"hour": 3,
		"load": 17347.6
	}, {"hour": 4, "load": 17565.2}, {"hour": 5, "load": 18496.7}, {"hour": 6, "load": 20154}, {
		"hour": 7,
		"load": 21317.5
	}, {"hour": 8, "load": 21586.2}, {"hour": 9, "load": 21901.7}, {"hour": 10, "load": 22136.2}, {
		"hour": 11,
		"load": 22139.8
	}, {"hour": 12, "load": 22111.2}, {"hour": 13, "load": 22026.1}, {"hour": 14, "load": 21904.4}, {
		"hour": 15,
		"load": 22001.6
	}, {"hour": 16, "load": 22611.4}, {"hour": 17, "load": 23467.7}, {"hour": 18, "load": 23298.1}, {
		"hour": 19,
		"load": 22882.6
	}, {"hour": 20, "load": 22141.4}, {"hour": 21, "load": 21074.9}, {"hour": 22, "load": 19546.9}, {
		"hour": 23,
		"load": 18167.3
	}],
	"weekend-1": [{"hour": 0, "load": 13723.4}, {"hour": 1, "load": 13157.7}, {"hour": 2, "load": 12771.9}, {
		"hour": 3,
		"load": 12534.5
	}, {"hour": 4, "load": 12512.9}, {"hour": 5, "load": 12764.2}, {"hour": 6, "load": 13405}, {
		"hour": 7,
		"load": 14049.2
	}, {"hour": 8, "load": 14943.4}, {"hour": 9, "load": 15481.3}, {"hour": 10, "load": 15798.2}, {
		"hour": 11,
		"load": 15969.6
	}, {"hour": 12, "load": 16020.2}, {"hour": 13, "load": 16089.9}, {"hour": 14, "load": 16162.8}, {
		"hour": 15,
		"load": 16257.7
	}, {"hour": 16, "load": 16452.5}, {"hour": 17, "load": 16660.7}, {"hour": 18, "load": 16810.1}, {
		"hour": 19,
		"load": 17121.1
	}, {"hour": 20, "load": 16786.8}, {"hour": 21, "load": 16202.3}, {"hour": 22, "load": 15335.7}, {
		"hour": 23,
		"load": 14391.2
	}],
	"weekend-2": [{"hour": 0, "load": 16353.1}, {"hour": 1, "load": 15627.3}, {"hour": 2, "load": 15133.9}, {
		"hour": 3,
		"load": 14831.6
	}, {"hour": 4, "load": 14726.4}, {"hour": 5, "load": 14910}, {"hour": 6, "load": 15418.9}, {
		"hour": 7,
		"load": 15939.3
	}, {"hour": 8, "load": 16650.9}, {"hour": 9, "load": 17185.9}, {"hour": 10, "load": 17539.1}, {
		"hour": 11,
		"load": 17648
	}, {"hour": 12, "load": 17644.7}, {"hour": 13, "load": 17587.2}, {"hour": 14, "load": 17425.5}, {
		"hour": 15,
		"load": 17310.6
	}, {"hour": 16, "load": 17225.6}, {"hour": 17, "load": 17241.3}, {"hour": 18, "load": 17313.5}, {
		"hour": 19,
		"load": 17578.2
	}, {"hour": 20, "load": 17277.9}, {"hour": 21, "load": 16696.3}, {"hour": 22, "load": 15908.6}, {
		"hour": 23,
		"load": 14985.7
	}],
	"normal-1": [{"hour": 0, "load": 16280.8}, {"hour": 1, "load": 15476.4}, {"hour": 2, "load": 14929.9}, {
		"hour": 3,
		"load": 14624.3
	}, {"hour": 4, "load": 14707.2}, {"hour": 5, "load": 15462.6}, {"hour": 6, "load": 17058.7}, {
		"hour": 7,
		"load": 18143.3
	}, {"hour": 8, "load": 18768.3}, {"hour": 9, "load": 19134.5}, {"hour": 10, "load": 19382.8}, {
		"hour": 11,
		"load": 19577.7
	}, {"hour": 12, "load": 19759.9}, {"hour": 13, "load": 20106.9}, {"hour": 14, "load": 20281}, {
		"hour": 15,
		"load": 20524.5
	}, {"hour": 16, "load": 20720.2}, {"hour": 17, "load": 20609}, {"hour": 18, "load": 20337.2}, {
		"hour": 19,
		"load": 20515
	}, {"hour": 20, "load": 20132.2}, {"hour": 21, "load": 19231.1}, {"hour": 22, "load": 17987.9}, {
		"hour": 23,
		"load": 16759
	}],
	"normal-2": [{"hour": 0, "load": 15672.4}, {"hour": 1, "load": 14998.2}, {"hour": 2, "load": 14624.7}, {
		"hour": 3,
		"load": 14465.2
	}, {"hour": 4, "load": 14642.3}, {"hour": 5, "load": 15506.6}, {"hour": 6, "load": 17258.8}, {
		"hour": 7,
		"load": 18555.1
	}, {"hour": 8, "load": 19419.5}, {"hour": 9, "load": 20050.1}, {"hour": 10, "load": 20520.3}, {
		"hour": 11,
		"load": 20842.9
	}, {"hour": 12, "load": 21060.5}, {"hour": 13, "load": 21348.2}, {"hour": 14, "load": 21423.4}, {
		"hour": 15,
		"load": 21488.5
	}, {"hour": 16, "load": 21560.4}, {"hour": 17, "load": 21400.7}, {"hour": 18, "load": 21097.9}, {
		"hour": 19,
		"load": 21043.5
	}, {"hour": 20, "load": 20580.4}, {"hour": 21, "load": 19761.8}, {"hour": 22, "load": 18688.8}, {
		"hour": 23,
		"load": 17453.3
	}]
};

export const eventDataSet = {
	"trump": [{"day": 1, "hour": 0, "load": 15025.4}, {"day": 1, "hour": 1, "load": 14476.6}, {
		"day": 1,
		"hour": 2,
		"load": 14206.3
	}, {"day": 1, "hour": 3, "load": 14133.4}, {"day": 1, "hour": 4, "load": 14373.8}, {
		"day": 1,
		"hour": 5,
		"load": 15293.2
	}, {"day": 1, "hour": 6, "load": 17131.8}, {"day": 1, "hour": 7, "load": 18443}, {
		"day": 1,
		"hour": 8,
		"load": 18746.8
	}, {"day": 1, "hour": 9, "load": 18878.9}, {"day": 1, "hour": 10, "load": 18871.9}, {
		"day": 1,
		"hour": 11,
		"load": 18766.7
	}, {"day": 1, "hour": 12, "load": 18696.1}, {"day": 1, "hour": 13, "load": 18752.2}, {
		"day": 1,
		"hour": 14,
		"load": 18736.6
	}, {"day": 1, "hour": 15, "load": 18904.4}, {"day": 1, "hour": 16, "load": 19517.6}, {
		"day": 1,
		"hour": 17,
		"load": 20434.8
	}, {"day": 1, "hour": 18, "load": 20328.1}, {"day": 1, "hour": 19, "load": 19902.3}, {
		"day": 1,
		"hour": 20,
		"load": 19275.1
	}, {"day": 1, "hour": 21, "load": 18338.5}, {"day": 1, "hour": 22, "load": 17096.8}, {
		"day": 1,
		"hour": 23,
		"load": 15821.4
	}, {"day": 2, "hour": 0, "load": 14890.2}, {"day": 2, "hour": 1, "load": 14371.9}, {
		"day": 2,
		"hour": 2,
		"load": 14094.5
	}, {"day": 2, "hour": 3, "load": 14009.7}, {"day": 2, "hour": 4, "load": 14251.2}, {
		"day": 2,
		"hour": 5,
		"load": 15153.3
	}, {"day": 2, "hour": 6, "load": 16948.2}, {"day": 2, "hour": 7, "load": 18314.7}, {
		"day": 2,
		"hour": 8,
		"load": 18758.1
	}, {"day": 2, "hour": 9, "load": 19063.5}, {"day": 2, "hour": 10, "load": 19295.9}, {
		"day": 2,
		"hour": 11,
		"load": 19257.8
	}, {"day": 2, "hour": 12, "load": 19103.7}, {"day": 2, "hour": 13, "load": 19087.6}, {
		"day": 2,
		"hour": 14,
		"load": 18974.8
	}, {"day": 2, "hour": 15, "load": 19034}, {"day": 2, "hour": 16, "load": 19440.8}, {
		"day": 2,
		"hour": 17,
		"load": 20085
	}, {"day": 2, "hour": 18, "load": 19872.8}, {"day": 2, "hour": 19, "load": 19341}, {
		"day": 2,
		"hour": 20,
		"load": 18702.9
	}, {"day": 2, "hour": 21, "load": 17905}, {"day": 2, "hour": 22, "load": 16844.5}, {
		"day": 2,
		"hour": 23,
		"load": 15719.1
	}, {"day": 3, "hour": 0, "load": 14782.8}, {"day": 3, "hour": 1, "load": 14161.2}, {
		"day": 3,
		"hour": 2,
		"load": 13793
	}, {"day": 3, "hour": 3, "load": 13611.6}, {"day": 3, "hour": 4, "load": 13623.1}, {
		"day": 3,
		"hour": 5,
		"load": 13900.9
	}, {"day": 3, "hour": 6, "load": 14533.8}, {"day": 3, "hour": 7, "load": 15301.4}, {
		"day": 3,
		"hour": 8,
		"load": 16069.7
	}, {"day": 3, "hour": 9, "load": 16740.1}, {"day": 3, "hour": 10, "load": 17052.4}, {
		"day": 3,
		"hour": 11,
		"load": 17047.4
	}, {"day": 3, "hour": 12, "load": 16903.4}, {"day": 3, "hour": 13, "load": 16504}, {
		"day": 3,
		"hour": 14,
		"load": 16324.3
	}, {"day": 3, "hour": 15, "load": 16459.7}, {"day": 3, "hour": 16, "load": 16914.4}, {
		"day": 3,
		"hour": 17,
		"load": 17991.4
	}, {"day": 3, "hour": 18, "load": 18157.8}, {"day": 3, "hour": 19, "load": 17868.8}, {
		"day": 3,
		"hour": 20,
		"load": 17446.5
	}, {"day": 3, "hour": 21, "load": 16844.1}, {"day": 3, "hour": 22, "load": 15980}, {
		"day": 3,
		"hour": 23,
		"load": 15029.4
	}],
	"trump-now": [{"day": 1, "hour": 0, "load": 17386.9}, {"day": 1, "hour": 1, "load": 16847.1}, {
		"day": 1,
		"hour": 2,
		"load": 16498.5
	}, {"day": 1, "hour": 3, "load": 16457.1}, {"day": 1, "hour": 4, "load": 16697.5}, {
		"day": 1,
		"hour": 5,
		"load": 17584.4
	}, {"day": 1, "hour": 6, "load": 19292.6}, {"day": 1, "hour": 7, "load": 20488.7}, {
		"day": 1,
		"hour": 8,
		"load": 20874.2
	}, {"day": 1, "hour": 9, "load": 21072.8}, {"day": 1, "hour": 10, "load": 21095.8}, {
		"day": 1,
		"hour": 11,
		"load": 20809.1
	}, {"day": 1, "hour": 12, "load": 20566.5}, {"day": 1, "hour": 13, "load": 20247.2}, {
		"day": 1,
		"hour": 14,
		"load": 20074.9
	}, {"day": 1, "hour": 15, "load": 20068.7}, {"day": 1, "hour": 16, "load": 20458.7}, {
		"day": 1,
		"hour": 17,
		"load": 21417.5
	}, {"day": 1, "hour": 18, "load": 21409.3}, {"day": 1, "hour": 19, "load": 20960.2}, {
		"day": 1,
		"hour": 20,
		"load": 20379
	}, {"day": 1, "hour": 21, "load": 19662.4}, {"day": 1, "hour": 22, "load": 18594}, {
		"day": 1,
		"hour": 23,
		"load": 17473.4
	}, {"day": 2, "hour": 0, "load": 16510.7}, {"day": 2, "hour": 1, "load": 15932.6}, {
		"day": 2,
		"hour": 2,
		"load": 15553.5
	}, {"day": 2, "hour": 3, "load": 15382.3}, {"day": 2, "hour": 4, "load": 15383.8}, {
		"day": 2,
		"hour": 5,
		"load": 15677.3
	}, {"day": 2, "hour": 6, "load": 16309.1}, {"day": 2, "hour": 7, "load": 17068.4}, {
		"day": 2,
		"hour": 8,
		"load": 17688.1
	}, {"day": 2, "hour": 9, "load": 17986.7}, {"day": 2, "hour": 10, "load": 18064.3}, {
		"day": 2,
		"hour": 11,
		"load": 17864.6
	}, {"day": 2, "hour": 12, "load": 17579.4}, {"day": 2, "hour": 13, "load": 17312.4}, {
		"day": 2,
		"hour": 14,
		"load": 17159.9
	}, {"day": 2, "hour": 15, "load": 17239.6}, {"day": 2, "hour": 16, "load": 17807.5}, {
		"day": 2,
		"hour": 17,
		"load": 19009
	}, {"day": 2, "hour": 18, "load": 19206.9}, {"day": 2, "hour": 19, "load": 18953.8}, {
		"day": 2,
		"hour": 20,
		"load": 18605.8
	}, {"day": 2, "hour": 21, "load": 17981.9}, {"day": 2, "hour": 22, "load": 17146.4}, {
		"day": 2,
		"hour": 23,
		"load": 16286.8
	}, {"day": 3, "hour": 0, "load": 15549}, {"day": 3, "hour": 1, "load": 15028.8}, {
		"day": 3,
		"hour": 2,
		"load": 14730.7
	}, {"day": 3, "hour": 3, "load": 14515.8}, {"day": 3, "hour": 4, "load": 14462.1}, {
		"day": 3,
		"hour": 5,
		"load": 14725.6
	}, {"day": 3, "hour": 6, "load": 15198.6}, {"day": 3, "hour": 7, "load": 15730.9}, {
		"day": 3,
		"hour": 8,
		"load": 16391.4
	}, {"day": 3, "hour": 9, "load": 16857.6}, {"day": 3, "hour": 10, "load": 17028.9}, {
		"day": 3,
		"hour": 11,
		"load": 17086.1
	}, {"day": 3, "hour": 12, "load": 17114.2}, {"day": 3, "hour": 13, "load": 17037.4}, {
		"day": 3,
		"hour": 14,
		"load": 17093
	}, {"day": 3, "hour": 15, "load": 17339.2}, {"day": 3, "hour": 16, "load": 17910.8}, {
		"day": 3,
		"hour": 17,
		"load": 19009
	}, {"day": 3, "hour": 18, "load": 19278.1}, {"day": 3, "hour": 19, "load": 18983}, {
		"day": 3,
		"hour": 20,
		"load": 18460
	}, {"day": 3, "hour": 21, "load": 17657}, {"day": 3, "hour": 22, "load": 16592.1}, {
		"day": 3,
		"hour": 23,
		"load": 15545.2
	}],
	"storm": [{"day": 1, "hour": 0, "load": 16718.3}, {"day": 1, "hour": 1, "load": 16260.8}, {
		"day": 1,
		"hour": 2,
		"load": 16022.3
	}, {"day": 1, "hour": 3, "load": 15984.8}, {"day": 1, "hour": 4, "load": 16266.8}, {
		"day": 1,
		"hour": 5,
		"load": 17156.7
	}, {"day": 1, "hour": 6, "load": 18959.7}, {"day": 1, "hour": 7, "load": 20233.5}, {
		"day": 1,
		"hour": 8,
		"load": 20610.9
	}, {"day": 1, "hour": 9, "load": 20666.3}, {"day": 1, "hour": 10, "load": 20618}, {
		"day": 1,
		"hour": 11,
		"load": 20527.4
	}, {"day": 1, "hour": 12, "load": 20226.6}, {"day": 1, "hour": 13, "load": 20012.6}, {
		"day": 1,
		"hour": 14,
		"load": 19817.4
	}, {"day": 1, "hour": 15, "load": 19635.1}, {"day": 1, "hour": 16, "load": 19731.2}, {
		"day": 1,
		"hour": 17,
		"load": 19899.4
	}, {"day": 1, "hour": 18, "load": 20273.2}, {"day": 1, "hour": 19, "load": 21009.2}, {
		"day": 1,
		"hour": 20,
		"load": 20808.3
	}, {"day": 1, "hour": 21, "load": 20025.9}, {"day": 1, "hour": 22, "load": 18879.8}, {
		"day": 1,
		"hour": 23,
		"load": 17686.8
	}, {"day": 2, "hour": 0, "load": 16671.2}, {"day": 2, "hour": 1, "load": 16068}, {
		"day": 2,
		"hour": 2,
		"load": 15714.6
	}, {"day": 2, "hour": 3, "load": 15632.4}, {"day": 2, "hour": 4, "load": 15770.5}, {
		"day": 2,
		"hour": 5,
		"load": 16296.3
	}, {"day": 2, "hour": 6, "load": 17231.7}, {"day": 2, "hour": 7, "load": 17944.9}, {
		"day": 2,
		"hour": 8,
		"load": 18589.5
	}, {"day": 2, "hour": 9, "load": 19445.6}, {"day": 2, "hour": 10, "load": 20103.8}, {
		"day": 2,
		"hour": 11,
		"load": 20353.9
	}, {"day": 2, "hour": 12, "load": 20407.7}, {"day": 2, "hour": 13, "load": 20323.9}, {
		"day": 2,
		"hour": 14,
		"load": 20096.8
	}, {"day": 2, "hour": 15, "load": 19889.4}, {"day": 2, "hour": 16, "load": 19925.6}, {
		"day": 2,
		"hour": 17,
		"load": 20162.5
	}, {"day": 2, "hour": 18, "load": 20386.5}, {"day": 2, "hour": 19, "load": 20886.5}, {
		"day": 2,
		"hour": 20,
		"load": 20533.1
	}, {"day": 2, "hour": 21, "load": 19741.8}, {"day": 2, "hour": 22, "load": 18674.2}, {
		"day": 2,
		"hour": 23,
		"load": 17485
	}, {"day": 3, "hour": 0, "load": 16569}, {"day": 3, "hour": 1, "load": 16072}, {
		"day": 3,
		"hour": 2,
		"load": 15847.1
	}, {"day": 3, "hour": 3, "load": 15778.6}, {"day": 3, "hour": 4, "load": 15999.4}, {
		"day": 3,
		"hour": 5,
		"load": 16752.9
	}, {"day": 3, "hour": 6, "load": 18214.3}, {"day": 3, "hour": 7, "load": 19397.4}, {
		"day": 3,
		"hour": 8,
		"load": 20023.5
	}, {"day": 3, "hour": 9, "load": 20529.5}, {"day": 3, "hour": 10, "load": 20846.4}, {
		"day": 3,
		"hour": 11,
		"load": 20961.8
	}, {"day": 3, "hour": 12, "load": 20939.7}, {"day": 3, "hour": 13, "load": 20878.8}, {
		"day": 3,
		"hour": 14,
		"load": 20672.1
	}, {"day": 3, "hour": 15, "load": 20597.9}, {"day": 3, "hour": 16, "load": 20716.8}, {
		"day": 3,
		"hour": 17,
		"load": 20945.7
	}, {"day": 3, "hour": 18, "load": 21117.4}, {"day": 3, "hour": 19, "load": 21689.3}, {
		"day": 3,
		"hour": 20,
		"load": 21483.3
	}, {"day": 3, "hour": 21, "load": 20540.9}, {"day": 3, "hour": 22, "load": 19182.9}, {
		"day": 3,
		"hour": 23,
		"load": 17832.2
	}],
	"storm-now": [{"day": 1, "hour": 0, "load": 15433.3}, {"day": 1, "hour": 1, "load": 14998.8}, {
		"day": 1,
		"hour": 2,
		"load": 14701.5
	}, {"day": 1, "hour": 3, "load": 14654.4}, {"day": 1, "hour": 4, "load": 14947.8}, {
		"day": 1,
		"hour": 5,
		"load": 15842.6
	}, {"day": 1, "hour": 6, "load": 17515.5}, {"day": 1, "hour": 7, "load": 18826.7}, {
		"day": 1,
		"hour": 8,
		"load": 19350.2
	}, {"day": 1, "hour": 9, "load": 19802.6}, {"day": 1, "hour": 10, "load": 20024.4}, {
		"day": 1,
		"hour": 11,
		"load": 20023.5
	}, {"day": 1, "hour": 12, "load": 19911.6}, {"day": 1, "hour": 13, "load": 19796}, {
		"day": 1,
		"hour": 14,
		"load": 19494.3
	}, {"day": 1, "hour": 15, "load": 19327.6}, {"day": 1, "hour": 16, "load": 19319.7}, {
		"day": 1,
		"hour": 17,
		"load": 19478.1
	}, {"day": 1, "hour": 18, "load": 19639.6}, {"day": 1, "hour": 19, "load": 20237.7}, {
		"day": 1,
		"hour": 20,
		"load": 19997.9
	}, {"day": 1, "hour": 21, "load": 19186.9}, {"day": 1, "hour": 22, "load": 17965.4}, {
		"day": 1,
		"hour": 23,
		"load": 16680.3
	}, {"day": 2, "hour": 0, "load": 15789.6}, {"day": 2, "hour": 1, "load": 15314.2}, {
		"day": 2,
		"hour": 2,
		"load": 15021.1
	}, {"day": 2, "hour": 3, "load": 14922.9}, {"day": 2, "hour": 4, "load": 15165.2}, {
		"day": 2,
		"hour": 5,
		"load": 16071.8
	}, {"day": 2, "hour": 6, "load": 17844.9}, {"day": 2, "hour": 7, "load": 19031.9}, {
		"day": 2,
		"hour": 8,
		"load": 19422.4
	}, {"day": 2, "hour": 9, "load": 19361.2}, {"day": 2, "hour": 10, "load": 19391.6}, {
		"day": 2,
		"hour": 11,
		"load": 19275.2
	}, {"day": 2, "hour": 12, "load": 19118}, {"day": 2, "hour": 13, "load": 19102.5}, {
		"day": 2,
		"hour": 14,
		"load": 19056.9
	}, {"day": 2, "hour": 15, "load": 19012.9}, {"day": 2, "hour": 16, "load": 19237.7}, {
		"day": 2,
		"hour": 17,
		"load": 19632.6
	}, {"day": 2, "hour": 18, "load": 19925.1}, {"day": 2, "hour": 19, "load": 20403}, {
		"day": 2,
		"hour": 20,
		"load": 20102.6
	}, {"day": 2, "hour": 21, "load": 19286.3}, {"day": 2, "hour": 22, "load": 18079.4}, {
		"day": 2,
		"hour": 23,
		"load": 16808.1
	}, {"day": 3, "hour": 0, "load": 15909}, {"day": 3, "hour": 1, "load": 15440.4}, {
		"day": 3,
		"hour": 2,
		"load": 15160.2
	}, {"day": 3, "hour": 3, "load": 15062.3}, {"day": 3, "hour": 4, "load": 15329.8}, {
		"day": 3,
		"hour": 5,
		"load": 16256.3
	}, {"day": 3, "hour": 6, "load": 18007.7}, {"day": 3, "hour": 7, "load": 19169.3}, {
		"day": 3,
		"hour": 8,
		"load": 19480.9
	}, {"day": 3, "hour": 9, "load": 19504.1}, {"day": 3, "hour": 10, "load": 19303}, {
		"day": 3,
		"hour": 11,
		"load": 18972.4
	}, {"day": 3, "hour": 12, "load": 18645.8}, {"day": 3, "hour": 13, "load": 18436}, {
		"day": 3,
		"hour": 14,
		"load": 18215.4
	}, {"day": 3, "hour": 15, "load": 18226.6}, {"day": 3, "hour": 16, "load": 18559.5}, {
		"day": 3,
		"hour": 17,
		"load": 18782
	}, {"day": 3, "hour": 18, "load": 19038.2}, {"day": 3, "hour": 19, "load": 19638.2}, {
		"day": 3,
		"hour": 20,
		"load": 19527.3
	}, {"day": 3, "hour": 21, "load": 18791.3}, {"day": 3, "hour": 22, "load": 17638.7}, {
		"day": 3,
		"hour": 23,
		"load": 16413.8
	}],
	"financial": [{"day": 1, "hour": 0, "load": 6031}, {"day": 1, "hour": 1, "load": 5725}, {
		"day": 1,
		"hour": 2,
		"load": 5527.8
	}, {"day": 1, "hour": 3, "load": 5411.9}, {"day": 1, "hour": 4, "load": 5351.7}, {
		"day": 1,
		"hour": 5,
		"load": 5368.6
	}, {"day": 1, "hour": 6, "load": 5455.7}, {"day": 1, "hour": 7, "load": 5623.4}, {
		"day": 1,
		"hour": 8,
		"load": 5992.6
	}, {"day": 1, "hour": 9, "load": 6486.3}, {"day": 1, "hour": 10, "load": 7013.3}, {
		"day": 1,
		"hour": 11,
		"load": 7466
	}, {"day": 1, "hour": 12, "load": 7801.5}, {"day": 1, "hour": 13, "load": 8050}, {
		"day": 1,
		"hour": 14,
		"load": 8250.7
	}, {"day": 1, "hour": 15, "load": 8355.9}, {"day": 1, "hour": 16, "load": 8364.4}, {
		"day": 1,
		"hour": 17,
		"load": 8266.2
	}, {"day": 1, "hour": 18, "load": 8171.3}, {"day": 1, "hour": 19, "load": 8328.1}, {
		"day": 1,
		"hour": 20,
		"load": 8395.8
	}, {"day": 1, "hour": 21, "load": 8218.8}, {"day": 1, "hour": 22, "load": 7889.6}, {
		"day": 1,
		"hour": 23,
		"load": 7464.3
	}, {"day": 2, "hour": 0, "load": 7063.3}, {"day": 2, "hour": 1, "load": 6730.6}, {
		"day": 2,
		"hour": 2,
		"load": 6536.5
	}, {"day": 2, "hour": 3, "load": 6471.5}, {"day": 2, "hour": 4, "load": 6507.5}, {
		"day": 2,
		"hour": 5,
		"load": 6761
	}, {"day": 2, "hour": 6, "load": 7155.7}, {"day": 2, "hour": 7, "load": 7650.2}, {
		"day": 2,
		"hour": 8,
		"load": 8084.3
	}, {"day": 2, "hour": 9, "load": 8499.5}, {"day": 2, "hour": 10, "load": 8728.5}, {
		"day": 2,
		"hour": 11,
		"load": 8859.7
	}, {"day": 2, "hour": 12, "load": 8938.1}, {"day": 2, "hour": 13, "load": 8980.6}, {
		"day": 2,
		"hour": 14,
		"load": 8987.7
	}, {"day": 2, "hour": 15, "load": 9024.6}, {"day": 2, "hour": 16, "load": 9076.8}, {
		"day": 2,
		"hour": 17,
		"load": 8950.9
	}, {"day": 2, "hour": 18, "load": 8517.1}, {"day": 2, "hour": 19, "load": 8380.7}, {
		"day": 2,
		"hour": 20,
		"load": 8129.9
	}, {"day": 2, "hour": 21, "load": 7689}, {"day": 2, "hour": 22, "load": 7134.3}, {
		"day": 2,
		"hour": 23,
		"load": 6469.3
	}, {"day": 3, "hour": 0, "load": 5891}, {"day": 3, "hour": 1, "load": 5500.4}, {
		"day": 3,
		"hour": 2,
		"load": 5284.8
	}, {"day": 3, "hour": 3, "load": 5175.6}, {"day": 3, "hour": 4, "load": 5147.1}, {
		"day": 3,
		"hour": 5,
		"load": 5402.6
	}, {"day": 3, "hour": 6, "load": 5993.1}, {"day": 3, "hour": 7, "load": 6610.4}, {
		"day": 3,
		"hour": 8,
		"load": 7054.2
	}, {"day": 3, "hour": 9, "load": 7371.8}, {"day": 3, "hour": 10, "load": 7498.9}, {
		"day": 3,
		"hour": 11,
		"load": 7577.3
	}, {"day": 3, "hour": 12, "load": 7587.1}, {"day": 3, "hour": 13, "load": 7630.5}, {
		"day": 3,
		"hour": 14,
		"load": 7631.5
	}, {"day": 3, "hour": 15, "load": 7642.9}, {"day": 3, "hour": 16, "load": 7674.4}, {
		"day": 3,
		"hour": 17,
		"load": 7574.3
	}, {"day": 3, "hour": 18, "load": 7315.9}, {"day": 3, "hour": 19, "load": 7253.8}, {
		"day": 3,
		"hour": 20,
		"load": 7054.6
	}, {"day": 3, "hour": 21, "load": 6758.8}, {"day": 3, "hour": 22, "load": 6345.3}, {
		"day": 3,
		"hour": 23,
		"load": 5802.1
	}],
	"financial-now": [{"day": 1, "hour": 0, "load": 5599.1}, {"day": 1, "hour": 1, "load": 5356.6}, {
		"day": 1,
		"hour": 2,
		"load": 5169.4
	}, {"day": 1, "hour": 3, "load": 5042.1}, {"day": 1, "hour": 4, "load": 4967.2}, {
		"day": 1,
		"hour": 5,
		"load": 4970.4
	}, {"day": 1, "hour": 6, "load": 5065.9}, {"day": 1, "hour": 7, "load": 5264.1}, {
		"day": 1,
		"hour": 8,
		"load": 5636.6
	}, {"day": 1, "hour": 9, "load": 6031.3}, {"day": 1, "hour": 10, "load": 6431.1}, {
		"day": 1,
		"hour": 11,
		"load": 6776
	}, {"day": 1, "hour": 12, "load": 7008.5}, {"day": 1, "hour": 13, "load": 7188.1}, {
		"day": 1,
		"hour": 14,
		"load": 7331.5
	}, {"day": 1, "hour": 15, "load": 7422.9}, {"day": 1, "hour": 16, "load": 7477.5}, {
		"day": 1,
		"hour": 17,
		"load": 7437.8
	}, {"day": 1, "hour": 18, "load": 7286.7}, {"day": 1, "hour": 19, "load": 7244.4}, {
		"day": 1,
		"hour": 20,
		"load": 7171.7
	}, {"day": 1, "hour": 21, "load": 7009.6}, {"day": 1, "hour": 22, "load": 6711.5}, {
		"day": 1,
		"hour": 23,
		"load": 6316.7
	}, {"day": 2, "hour": 0, "load": 5671.9}, {"day": 2, "hour": 1, "load": 5370.7}, {
		"day": 2,
		"hour": 2,
		"load": 5184.3
	}, {"day": 2, "hour": 3, "load": 5098}, {"day": 2, "hour": 4, "load": 5117.7}, {
		"day": 2,
		"hour": 5,
		"load": 5372.8
	}, {"day": 2, "hour": 6, "load": 5945.3}, {"day": 2, "hour": 7, "load": 6547.3}, {
		"day": 2,
		"hour": 8,
		"load": 6962.6
	}, {"day": 2, "hour": 9, "load": 7228.6}, {"day": 2, "hour": 10, "load": 7332.8}, {
		"day": 2,
		"hour": 11,
		"load": 7404.9
	}, {"day": 2, "hour": 12, "load": 7471.7}, {"day": 2, "hour": 13, "load": 7536.5}, {
		"day": 2,
		"hour": 14,
		"load": 7480.5
	}, {"day": 2, "hour": 15, "load": 7545.5}, {"day": 2, "hour": 16, "load": 7568.3}, {
		"day": 2,
		"hour": 17,
		"load": 7455.4
	}, {"day": 2, "hour": 18, "load": 7224.8}, {"day": 2, "hour": 19, "load": 7117.6}, {
		"day": 2,
		"hour": 20,
		"load": 6867.9
	}, {"day": 2, "hour": 21, "load": 6604.4}, {"day": 2, "hour": 22, "load": 6311.5}, {
		"day": 2,
		"hour": 23,
		"load": 5990.7
	}, {"day": 3, "hour": 0, "load": 5623.3}, {"day": 3, "hour": 1, "load": 5347.2}, {
		"day": 3,
		"hour": 2,
		"load": 5151.7
	}, {"day": 3, "hour": 3, "load": 5024}, {"day": 3, "hour": 4, "load": 4949.4}, {
		"day": 3,
		"hour": 5,
		"load": 4984.1
	}, {"day": 3, "hour": 6, "load": 5142.9}, {"day": 3, "hour": 7, "load": 5420.3}, {
		"day": 3,
		"hour": 8,
		"load": 5794.8
	}, {"day": 3, "hour": 9, "load": 6122.4}, {"day": 3, "hour": 10, "load": 6404}, {
		"day": 3,
		"hour": 11,
		"load": 6600.5
	}, {"day": 3, "hour": 12, "load": 6727.7}, {"day": 3, "hour": 13, "load": 6796.4}, {
		"day": 3,
		"hour": 14,
		"load": 6879
	}, {"day": 3, "hour": 15, "load": 6919.3}, {"day": 3, "hour": 16, "load": 6938.2}, {
		"day": 3,
		"hour": 17,
		"load": 6888
	}, {"day": 3, "hour": 18, "load": 6736.9}, {"day": 3, "hour": 19, "load": 6659}, {
		"day": 3,
		"hour": 20,
		"load": 6560
	}, {"day": 3, "hour": 21, "load": 6392}, {"day": 3, "hour": 22, "load": 6163.8}, {
		"day": 3,
		"hour": 23,
		"load": 5885.7
	}]
};