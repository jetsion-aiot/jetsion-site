    load_html();
    setTimeout(function() {
        document.querySelector('header > .station > span').innerHTML = '台北轉運站';
    }, 300);
    $(document).ready(function() {
        // Full_screen();
        setTimeout(function() {
            // viewport();
            Start_update();
            updateClock();
            setInterval(updateClock, 1000);


        }, 500);
    });

    function Start_update() {
        var $progress = $('.progress');
        var $progressBar = $('.progress-bar');
        var $alert = $('.alert-ok');
        $(".start-update").click(function() {
            setTimeout(function() {
                $progressBar.css('width', '10%');
                setTimeout(function() {
                    $progressBar.css('width', '30%');
                    setTimeout(function() {
                        $progressBar.css('width', '100%');
                        setTimeout(function() {
                            $progress.css('display', 'none');
                            $alert.css('display', 'block');
                            $(".start-update,.start-update-info").addClass("d-none");
                        }, 500); // WAIT 5 milliseconds
                    }, 2000); // WAIT 2 seconds
                }, 1000); // WAIT 1 seconds
            }, 1000); // WAIT 1 second
        });

    }

    function updateClock() {
        var currentTime = new Date();
        // Operating System Clock Hours for 12h clock
        var currentHoursAP = currentTime.getHours();
        // Operating System Clock Hours for 24h clock
        var currentHours = currentTime.getHours();
        // Operating System Clock Minutes
        var currentMinutes = currentTime.getMinutes();
        // Operating System Clock Seconds
        var currentSeconds = currentTime.getSeconds();
        // Adding 0 if Minutes & Seconds is More or Less than 10
        currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
        currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
        // Picking "AM" or "PM" 12h clock if time is more or less than 12
        var timeOfDay = (currentHours < 12) ? "AM" : "PM";
        // transform clock to 12h version if needed
        currentHoursAP = (currentHours > 12) ? currentHours - 12 : currentHours;
        // transform clock to 12h version after mid night
        currentHoursAP = (currentHoursAP == 0) ? 12 : currentHoursAP;
        // display first 24h clock and after line break 12h version
        var currentTimeString = currentHours + ":" + currentMinutes;
        // print clock js in div #clock.
        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        $("header .now-time").html(currentTimeString);
        $("header .now-date").html(date);
    }


    function touch_spin() {
        $('.touchspin-plus').on('click', function() {
            var new_val = parseInt($(this).parent().prev().find("input").attr('value')) + 1;
            $(this).parent().prev().find("input").attr('value', new_val);
        });
        $('.touchspin-minus').on('click', function() {
            var now_val = $(this).parent().next().find("input").attr('value');
            if (now_val != 0) {
                $(this).parent().next().find("input").attr('value', parseInt(now_val) - 1);
            }

        });
    }

    function drop_visible() {
        $('.dropdown').on('show.bs.dropdown', function() {
            $(".has-dropdown").addClass("visible-drop");
        });
        $('.dropdown').on('hide.bs.dropdown', function() {
            $(".has-dropdown").removeClass("visible-drop");
        });
        $(".has-dropdown .list-group a").click(function() {
            var select_val = $(this).html();
            $(".coupon-code").val(select_val);
        });
    }

    function widget_content() {
        $(".widget-content .table tbody tr").on('click', function() {
            $(this).addClass("table-warning").siblings().removeClass("table-warning");
            $(this).find('input:radio').prop('checked', true);
            // $(this).find('input:checkbox').prop('checked', true);

        });

    }

    function Picklist_go() {
        $(".picklist").pickList({
            sourceListLabel: "可選擇",
            targetListLabel: "已選擇 ",
            addAllLabel: '<i class="icon-double-arrow-right"></i>',
            addLabel: '<i class="icon-chevron-right"></i>',
            removeAllLabel: '<i class="icon-double-arrow-left"></i>',
            removeLabel: '<i class="icon-chevron-left"></i>',
            sortAttribute: "value",
            items: [{
                // value: 6,
                // label: "10803006 朱俊宇 797-U9",
                // selected: false
            }]
        });

        // Example of adding a regular item after picklist creation.
        // Note there is no "element" property as that's for rich content only.
        // $("#Picklist-hold").pickList("insert", {
        //     value: 2,
        //     label: "刷樂安全牙籤S361​",
        //     label: "刷樂超柔順牙線棒S30​",
        //     selected: true
        // });
    }

    function viewport() {
        var viewportWidth = $(window).width();
        if (viewportWidth > 992) {
            // $(".main-container").removeClass("side-menu-close");
            // $(".menu-hold").removeClass("collapse");
            $(".menu-hold .menu li .sub_menu").removeClass("collapse");
        } else {
            // $(".menu-hold").addClass("collapse");
            $(".menu-hold .menu li .sub_menu").addClass("collapse");

        }
    }

    function password_eye() {
        $(".toggle-password").click(function() {
            $(this).toggleClass("icon-eye-2");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    }



    function Full_screen() {
        addEventListener("click", function() {
            var
                el = document.documentElement,
                rfs =
                el.requestFullScreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen;
            rfs.call(el);
        });

        function launchFullScreen(element) {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        }
        // Launch fullscreen for browsers that support it!
        launchFullScreen(document.documentElement);
    }

    function slim_scroll() {
        $('.right-container').slimScroll({
            height: 'calc(100vh - 45px)',
            alwaysVisible: true,
            color: '#000',
            size: '5px',
            opacity: .3, //滾動條透明度
            disableFadeOut: true, //是否 滑鼠經過可滾動區域時顯示元件，離開時隱藏元件
            borderRadius: '10px', //滾動條圓角
            allowPageScroll: true
        });
    };

    function file_upload() {

        $('.btn-file input[type="file"]').on('change', function(e) {
            var fileName = e.target.files[0].name;
            $(this).parent().parent().parent().find(".form-control").attr("value", fileName)
        });

    }

    function checkall() {
        $('.demo-checkall').click(function() {
            var state = $(this).find("input").is(':checked');
            if (state) {
                $(".tb-multi tbody .checkbox input").prop("checked", true);
            } else {
                $(".tb-multi tbody .checkbox input").prop("checked", false);
            }
        });

        $('.adress-check').click(function() {
            var state = $(this).find("input").is(':checked');
            if (state) {
                $(this).next('.adress-check-show').addClass("hide");
            } else {
                $(this).next('.adress-check-show').removeClass("hide");
            }
        });

    }

    function radio_toggle() {
        $(".radio-toggle-link1").click(function() {
            $(".demo-radio-toggle").removeClass("in");
        });
        $(".radio-toggle-link2").click(function() {
            $(".demo-radio-toggle").addClass("in");
        });
        $(".radio-hide").click(function() {
            $(".demo-other").addClass("d-none");
        });
        $(".radio-show").click(function() {
            // $(".demo-date").removeClass("d-none");
            $(".demo-other").removeClass("d-none");
        });

    }

    function alert_show() {
        $('.show-alert').click(function() {
            $('.pop-alert').addClass("in");
            $(this).addClass("hide");
            $(".btn-count").removeClass("hide");
            countdown_btn();
            setTimeout(function() {
                $('.pop-alert').removeClass("in")
            }, 3000);
        });
    }

    function countdown_btn() {
        var timeleft = 54;
        var downloadTimer = setInterval(function() {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = "0";
                $('.show-alert').removeClass("hide");
                $(".btn-count").addClass("hide");
            } else {
                document.getElementById("countdown").innerHTML = timeleft;
            }
            timeleft -= 1;
        }, 1000);
    }


    function date_picker_fun() {
        $('.datepicker').datepicker({
            format: 'yyyy/mm/dd',
            autoclose: true,
        });
        $('.datepicker-start-end').datepicker({
            todayHighlight: true,
            format: 'yyyy/mm/dd',
            startDate: "-8d",
            endDate: "+8d",
            autoclose: true,
        });
        $(".datepicker-months").datepicker({ //只顯示月份
            format: "yyyy/mm",
            viewMode: "months",
            minViewMode: "months",
            autoclose: true,
        });
        $(".datepicker-years").datepicker({ //只顯示年份
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            autoclose: true,
        });
    }

    // 點了placeholder消失
    function input_title_show_hide() {
        $('input:text, textarea, input:password').each(function() {
            var $this = $(this);
            $this.data('placeholder', $this.attr('placeholder'))
                .focus(function() {
                    $this.removeAttr('placeholder');
                })
                .blur(function() {
                    $this.attr('placeholder', $this.data('placeholder'));
                });
        });
    }



    function load_html() {
        window.onload = function() {
            function a(a, b) {
                var c = /^(?:file):/,
                    d = new XMLHttpRequest,
                    e = 0;
                d.onreadystatechange = function() {
                    4 == d.readyState && (e = d.status), c.test(location.href) && d.responseText && (e = 200), 4 == d.readyState && 200 == e && (a.outerHTML = d.responseText)
                };
                try {
                    d.open("GET", b, !0), d.send()
                } catch (f) {}
            }
            var b, c = document.getElementsByTagName("*");
            for (b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && a(c[b], c[b].getAttribute("data-include"))
        };
        // document.getElementById("load-header").setAttribute("data-include", "html/header.html");
        // document.getElementById("load-footer").setAttribute("data-include", "../footer.html");
        // document.getElementById("cframe").getElementsByClassName("load-nav-area")[0].setAttribute("data-include", "../nav-area.html");
        // document.getElementById("load-modal").setAttribute("data-include", "modal-sample.html");
    }