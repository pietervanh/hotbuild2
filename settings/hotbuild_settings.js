//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time','hotbuild_reset_time','UI','Number',2000);
model.addSetting_Text('Hotbuild Requeue Amount','hotbuild_requeue_amount','UI','Number',50);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

$("#game_settings").children(":first").append("<li class='game_settings'>" +
                "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
            "</li>");
$("#game_settings").append("<div class='div_settings' id='tab_hotbuildprefs'>" +
                "<h1>WIP<h1/><br/>" +
                "Select Hotbuild key: <select name='uihotbuildkey'><option>f</option></select><br/>" +
                "Add Building to key: <select name='uihotbuildbuilding'><option>Vehicule Factory</option></select> Add<br/>" +
                "Add Unit to key: <select name='uihotbuildunit'><option>Ant</option></select> Add<br/>" +
                "<hr>" +
                "<table cellspacing='1' cellpadding='1'><thead><tr><td><b>Building/Unit</b></td><td><b>Sequence</b></td></tr></thead>" +
                "<tr><td>Vehicule Factory</td><td>Down</td>"+
                "<tr><td>Bot Factory</td><td>Up Down</td>" +
                "<tr><td>Vehicule Fabricator</td><td>Up Down</td>" +
                "<tr><td>Bot Fabricator</td><td>Up</td>" +
                "<table>" +
            "</div>");