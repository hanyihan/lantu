/*index交互*/

// banner 轮播
(function() {
	var $tab = $('.banner .ban_tab ul li'),
		$part =$('.banner .ban_part .part'),
		$banner = $('.banner'),
		length = $tab.length,
		timer = null,
		index = 0;
		// 默认第一个显示
		$tab.eq(0).addClass('current');
		$part.eq(0).show();
		$tab.click(function(){
			var i = $(this).index();
			if(i !== index) {
				change(function(){
					index = i;
				});
			}
		});
		auto();

		$banner.hover(function(){
			clearInterval(timer);
		},auto);

		function auto(){
			timer = setInterval(function() {
				change(function() {
					index++;
					index %= length;
				});
			},3000)
		}

		function change(fn){
			$tab.eq(index).removeClass('current');
			$part.eq(index).fadeOut(500);
			fn && fn();
			$tab.eq(index).addClass('current');
			$part.eq(index).fadeIn(500);
		}
})();

// part1 video control

(function(){
	var oPlay = document.getElementsByClassName('play-icon')[0];
	var oVideo = document.getElementsByTagName('video')[0];
	oPlay.onclick=function(){
		this.style.display = 'none';
		oVideo.style.display = 'block';
		oVideo.play();
	}
})();


//cases 经典案例轮播

(function(){
	var $ul =$('.cases .cases_con ul'),
		$li = $ul.children(),
		$btn = $('.cases .case_btn div'),
		$tab = $('.cases .case_tab ul li'),
		width = $ul.children().eq(0).width(),
		length = $li.length,
		midIndex = Math.floor(length / 2),
		clickTime = 0,
		sumWidth = 0,
		timer;
		changeClassName();
		setTimeout(function() {
		    sumWidth = 0;
		    $li.each(function() {
		        sumWidth += $(this).width();
		    });
		    $ul.css('marginLeft', -sumWidth / 2 + 'px').css('opacity', 1);
		}, 300);
		$(window).resize(function() {
		    clearTimeout(timer);
		    timer = setTimeout(function() {
		        width = $ul.children().eq(0).width();
		        sumWidth = 0;
		        $li.each(function() {
		            sumWidth += $(this).width();
		        });
		        $ul.animate({ 'marginLeft': -sumWidth / 2 + 'px' }, 300);
		    }, 300);
		});
		$btn.click(function() {
		    if (new Date() - clickTime > 350) {
		        clickTime = new Date();
		        if ($(this).index()) {
		            midIndex++;
		            midIndex %= length;
		            $ul.stop().animate({
		                'marginLeft': -sumWidth / 2 - width + 'px'
		            }, 300, function() {
		                $(this).css('marginLeft', -sumWidth / 2 + 'px').append($(this).children().first());
		            });
		        } else {
		            midIndex--;
		            if (midIndex < 0) midIndex = length - 1;
		            $ul.stop().animate({
		                'marginLeft': -sumWidth / 2 + width + 'px'
		            }, 300, function() {
		                $(this).css('marginLeft', -sumWidth / 2 + 'px').prepend($(this).children().last());
		            });
		        }
		        $tab.eq(midIndex).addClass('get').siblings().removeClass('get');
		        changeClassName();
		    }
		});

		function changeClassName() {
			var a = midIndex,
				b = midIndex + 1,
				c = midIndex - 1;
				if(b >= length) {
					b = 0;
				}
				if(c < 0) {
					c = length -1;
				}
				$tab.eq(a).addClass('get');
				$li.removeClass('middle side');
				$li.eq(a).addClass('middle');
				$li.eq(b).addClass('side');
				$li.eq(c).addClass('side');
		}

})();

























