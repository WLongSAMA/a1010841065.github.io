$(document).ready(function () {
	resize();
	
	$(".search input").focus(function () {
		$(".clear").fadeToggle(0);
	});
	$(".search input").blur(function () {
		$(".clear").fadeToggle(200);
	});
	$(".clear").click(function () {
		$(".search input").val("");
		$(".main .search .enter").trigger("click");
	});

	var offset = $(".SearchBar").offset();
	$(document).on("scroll", function () {
		if (offset.top <= $(document).scrollTop()) {
			$(".SearchBar").css({
				"position": "fixed",
				"top": "0px",
				"padding": "10px",
				"margin": "0px -10px",
				"box-shadow": "rgba(0, 0, 0, 0.2) 0px 0px 20px 2px"
			});
		} else {
			$(".SearchBar").css({
				"position": "absolute",
				"top": "65px",
				"padding": "0px 10px 10px",
				"margin": "0px -10px",
				"box-shadow": ""
			});
		}
	});
	
	$(".main .ss-header li").click(function () {
		if ($(this).hasClass("actived")) {
			$(this).removeClass("actived");
			$(".ss-container .ss-content").eq($(this).index()).removeClass("actived");
		} else {
			$(".ss-header li").removeClass("actived");
			$(".ss-container .ss-content").removeClass("actived");
			$(this).addClass("actived");
			$(".ss-container .ss-content").eq($(this).index()).addClass("actived");
		}
	});

    $(".main .ss-content li").on("click",function(){
		$(".main .search input").val($(this).children("span").html());
		$(".ss-header li").removeClass("actived");
		$(".ss-container .ss-content").removeClass("actived");
		$(".main .search .enter").trigger("click");
    });
});

$(window).resize(function() {
	resize();
});

function resize() {
	$(".SearchBar").width($(".main").width());
}

$(document).ready(function () {
	//输出
	ChuShiHua();

	//搜索
	$(".main .search input").keydown(function (e) {
		if (e.keyCode == 13) {
			ShuChu();
		}
	});
	$(".main .search .enter").click(function () {
		ShuChu();
	});
});

function ChuShiHua() {
	$(".NotFound").hide();
	ShuChuTanSuo();
	ShuChuYuHun();
	ShuChuMiWen();
}

function ShuChu() {
	var strKeyword = $.trim($(".main .search input").val());
	if (strKeyword === "") {
		ChuShiHua();
	} else {
		GuoLvTanSuo(strKeyword);
		GuoLvYuHun(strKeyword);
		GuoLvMiWen(strKeyword);
		NotFound();
	}
	$(window).scrollTop(0);
}

function NotFound() {
	if ($(".tansuo").html() === "" && $(".yuhun").html() === "" && $(".miwen").html() === "") {
		$(".NotFound").show();
	} else {
		$(".NotFound").hide();
	}
}

function TongJi(strData, strName) {
	var strTmp, i, intTmp, intN = 0;
	strTmp = strData.split(" ");
	for (i = 0; i < strTmp.length; i++) {
		if (strTmp[i].indexOf(strName) !== -1) {
			intTmp = parseInt(strTmp[i].substring(strTmp[i].lastIndexOf("x") + 1, strTmp[i].length));
			if (strData.indexOf("普通") !== -1 && strData.indexOf("困难") !== -1) {
				intN = intN > intTmp ? intN : intTmp;
			} else {
				intN = intN + intTmp;
			}
		}
	}
	return (intN);
}

function GaoLiang(strData, strName) {
	return (strData.split(strName).join("<span>" + strName + "</span>"));
}

function ShuChuTanSuo() {
	var i, j, strTanSuo = "";
	for (i = 0; i < tansuoData.length; i++) {
		strTanSuo = strTanSuo + '<div class="title1">' + tansuoData[i].title + "</div>";
		for (j = 0; j < tansuoData[i].content.length; j++) {
			strTanSuo = strTanSuo + '<div class="title2">' + tansuoData[i].content[j].name + "</div>";
			strTanSuo = strTanSuo + '<div class="title3">' + tansuoData[i].content[j].ghost + "</div>";
		}
		strTanSuo = strTanSuo + '<div class="title2">首领:' + tansuoData[i].boss.name + "</div>";
		strTanSuo = strTanSuo + '<div class="title3">' + tansuoData[i].boss.ghost + "</div>";
		if (tansuoData[i].challenge !== "") {
			strTanSuo = strTanSuo + '<div class="title2">挑战</div>';
			strTanSuo = strTanSuo + '<div class="title3">' + tansuoData[i].challenge + "</div>";
		}
	}
	$(".tansuo").html(strTanSuo);
}

function GuoLvTanSuo(strName) {
	var strTanSuo = "",
		strTmp, i, j;
	for (i = 0; i < tansuoData.length; i++) {
		strTmp = '<div class="title1">' + tansuoData[i].title + "</div>";
		for (j = 0; j < tansuoData[i].content.length; j++) {
			if (tansuoData[i].content[j].ghost.indexOf(strName) !== -1) {
				strTmp = strTmp + '<div class="count">' + TongJi(tansuoData[i].content[j].ghost, strName) +
					'</div><div class="title2">' + tansuoData[i].content[j].name + "</div>";
				strTmp = strTmp + '<div class="title3">' + GaoLiang(tansuoData[i].content[j].ghost, strName) + "</div>";
			}
		}
		if (tansuoData[i].boss.ghost.indexOf(strName) !== -1) {
			strTmp = strTmp + '<div class="count">' + TongJi(tansuoData[i].boss.ghost, strName) +
				'</div><div class="title2">首领:' + tansuoData[i].boss.name + "</div>";
			strTmp = strTmp + '<div class="title3">' + GaoLiang(tansuoData[i].boss.ghost, strName) + "</div>";
		}
		if (tansuoData[i].challenge !== "" && tansuoData[i].challenge.indexOf(strName) !== -1) {
			strTmp = strTmp + '<div class="count">' + TongJi(tansuoData[i].challenge, strName) +
				'</div><div class="title2">挑战</div>';
			strTmp = strTmp + '<div class="title3">' + GaoLiang(tansuoData[i].challenge, strName) + "</div>";
		}
		if (strTmp !== '<div class="title1">' + tansuoData[i].title + "</div>") strTanSuo = strTanSuo + strTmp;
	}
	$(".tansuo").html(strTanSuo);
}

function ShuChuYuHun() {
	var i, j, strYuHun = "";
	for (i = 0; i < yuhunData.length; i++) {
		strYuHun = strYuHun + '<div class="title1">' + yuhunData[i].title + "</div>";
		for (j = 0; j < yuhunData[i].content.length; j++) {
			strYuHun = strYuHun + '<div class="title2">' + yuhunData[i].content[j].name + "</div>";
			strYuHun = strYuHun + '<div class="title3">' + yuhunData[i].content[j].ghost + "</div>";
		}
	}
	$(".yuhun").html(strYuHun);
}

function GuoLvYuHun(strName) {
	var strYuHun = "",
		strTmp, i, j;
	for (i = 0; i < yuhunData.length; i++) {
		strTmp = '<div class="title1">' + yuhunData[i].title + "</div>";
		for (j = 0; j < yuhunData[i].content.length; j++) {
			if (yuhunData[i].content[j].ghost.indexOf(strName) !== -1) {
				strTmp = strTmp + '<div class="count">' + TongJi(yuhunData[i].content[j].ghost, strName) +
					'</div><div class="title2">' + yuhunData[i].content[j].name + "</div>";
				strTmp = strTmp + '<div class="title3">' + GaoLiang(yuhunData[i].content[j].ghost, strName) + "</div>";
			}
		}
		if (strTmp !== '<div class="title1">' + yuhunData[i].title + "</div>") strYuHun = strYuHun + strTmp;
	}
	$(".yuhun").html(strYuHun);
}

function ShuChuMiWen() {
	var i, j, strMiWen = "";
	for (i = 0; i < miwenData.length; i++) {
		strMiWen = strMiWen + '<div class="title1">' + miwenData[i].title + "</div>";
		for (j = 0; j < miwenData[i].content.length; j++) {
			strMiWen = strMiWen + '<div class="title2">' + miwenData[i].content[j].name + "</div>";
			strMiWen = strMiWen + '<div class="title3">' + miwenData[i].content[j].ghost + "</div>";
		}
	}
	$(".miwen").html(strMiWen);
}

function GuoLvMiWen(strName) {
	var strMiWen = "",
		strTmp, i, j;
	for (i = 0; i < miwenData.length; i++) {
		strTmp = '<div class="title1">' + miwenData[i].title + "</div>";
		for (j = 0; j < miwenData[i].content.length; j++) {
			if (miwenData[i].content[j].ghost.indexOf(strName) !== -1) {
				strTmp = strTmp + '<div class="count">' + TongJi(miwenData[i].content[j].ghost, strName) +
					'</div><div class="title2">' + miwenData[i].content[j].name + "</div>";
				strTmp = strTmp + '<div class="title3">' + GaoLiang(miwenData[i].content[j].ghost, strName) + "</div>";
			}
		}
		if (strTmp !== '<div class="title1">' + miwenData[i].title + "</div>") strMiWen = strMiWen + strTmp;
	}
	$(".miwen").html(strMiWen);
}







