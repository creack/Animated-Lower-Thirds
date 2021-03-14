const bcp = new BroadcastChannel("obs-lower-thirds-channel"); //Receives from the source
const bcr = new BroadcastChannel("obs-lower-thirds-channel2"); //Send to Control Panel
const bcf = new BroadcastChannel("obs-lower-thirds-fonts");

let alt_1_logo_image_old;
let alt_1_align_old = "left";
let alt_1_style_old;
let canIn1 = false;
let c1 = 0;
let d1 = 0;
let t1;
let s1;
let active1IsOn = 0;
let inactive1IsOn = 0;
let alt_1_turnoff;

function animationIn(animation) {
  const elementAnim = document.getElementById(animation);
  if (!elementAnim) return;
  elementAnim.classList.remove("animation-out");
  void elementAnim.offsetWidth;
  elementAnim.classList.add("animation-in");
}

function animationOut(animation) {
  const elementAnim = document.getElementById(animation);
  if (!elementAnim) return;
  elementAnim.classList.remove("animation-in");
  //void elementAnim.offsetWidth;
  elementAnim.classList.add("animation-out");
}

function activeCount(i) {
  switch (i) {
    case "lower-third-1":
      {
        if (c1 <= alt_1_active_time) {
          c1 = c1 + 1;
          t1 = setTimeout(activeCount, 1000, i);
        } else {
          stopTimeCount(i);
          startInactiveCount(i);
        }
      }
      break;
    default:
      break;
  }
}

function inactiveCount(i) {
  switch (i) {
    case "lower-third-1":
      {
        if (d1 <= alt_1_inactive_time) {
          d1 = d1 + 1;
          s1 = setTimeout(inactiveCount, 1000, i);
        } else {
          startActiveCount(i);
          d1 = 0;
          clearTimeout(s1);
          inactive1IsOn = 0;
        }
      }
      break;
    default:
      break;
  }
}

// Can start Active time counter? Start Animation In
function startActiveCount(i) {
  if (!active1IsOn && i == "lower-third-1") {
    active1IsOn = true;
    activeCount(i);
    animationIn(i);
  }
}

// Can start Inactive time counter? Start Animation Out
function startInactiveCount(i) {
  if (!inactive1IsOn && i == "lower-third-1") {
    inactive1IsOn = true;
    if (!alt_1_oneshot) {
      inactiveCount(i);
    } else {
      alt_1_turnoff = true;
    }
    animationOut(i);
  }
}

// Stop active and inactive states.
function stopTimeCount(i) {
  if (i == "lower-third-1") {
    c1 = 0;
    d1 = 0;
    active1IsOn = 0;
    inactive1IsOn = 0;
    clearTimeout(s1);
    clearTimeout(t1);
  }

  animationOut(i);
}

function changeLogoVisibility(alt_1_logo_switch, alt_1_logo_image) {
  if (alt_1_logo_switch == "true") {
    $("#alt-1-logo").removeClass("no-logo");
    loadLogo("alt-1-logo-image", alt_1_logo_image);
  } else {
    $("#alt-1-logo").addClass("no-logo");
    loadLogo("alt-1-logo-image");
  }
}

///////////////////////////
bcp.onmessage = function (ev) {
  const received_data = ev.data;
  //$('#msg1').html($('#msg1').html() + '<br />' + JSON.stringify(received_data))
  const { global_animation_time, global_oneshot } = received_data;

  activeTime = received_data.global_active_time;
  inactiveTime = received_data.global_inactive_time;

  // Animated Lower Thirds 1.
  const {
    alt_1_style,
    alt_1_name,
    alt_1_info,
    alt_1_name_size,
    alt_1_info_size,
    alt_1_name_transform,
    alt_1_info_transform,
    alt_1_name_weight,
    alt_1_info_weight,
    alt_1_name_color,
    alt_1_info_color,
    alt_1_logo_switch,
    alt_1_background_switch,
    alt_1_shadows,
    alt_1_align = "left",
    alt_1_size,
    alt_1_margin_h,
    alt_1_margin_v,
    alt_1_font,
    alt_1_logo_image = "../logos/logo_1.png",
    alt_1_logo_size,
    alt_1_shadow_amount,
    alt_1_corners,
    alt_1_border_switch,
  } = received_data;

  let {
    alt_1_switch,
    alt_1_preview,
    alt_1_style_color_1,
    alt_1_style_color_2,
    alt_1_line_spacing,
    alt_1_border_thickness_amount,
    alt_1_style_color_3,
    alt_1_style_color_4,
  } = received_data;

  document.getElementById("alt-1-name").innerHTML = alt_1_name;
  document.getElementById("alt-1-info").innerHTML = alt_1_info;

  if (alt_1_background_switch == "false") {
    alt_1_style_color_1 = "none";
    alt_1_style_color_2 = "none";
  }

  alt_1_line_spacing = alt_1_line_spacing * 0.1;
  alt_1_border_thickness_amount = alt_1_border_thickness_amount * 0.1;

  if (alt_1_border_switch == "false") {
    alt_1_style_color_3 = "none";
    alt_1_style_color_4 = "none";
    alt_1_border_thickness_amount = 0;
  }

  //Use the global times settins if custom times is empty
  alt_1_animation_time = Number(received_data.alt_1_animation_time || global_animation_time);
  alt_1_active_time = Number(received_data.alt_1_active_time || activeTime);
  alt_1_inactive_time = Number(received_data.alt_1_inactive_time || inactiveTime);

  //Use the global oneshot setting if oneshot switch is off or inactive field is empty
  alt_1_oneshot = received_data.alt_1_oneshot || (global_oneshot && !received_data.alt_1_inactive_time);

  if (alt_1_inactive_time < alt_1_animation_time) {
    alt_1_inactive_time = alt_1_animation_time;
  }

  if (alt_1_active_time < alt_1_animation_time) {
    alt_1_active_time = alt_1_animation_time;
  }

  // Check the switches.
  if (alt_1_switch == "false" || alt_1_name.length == 0 || alt_1_info.length == 0) {
    if (canIn1) {
      canIn1 = false;
      stopTimeCount("lower-third-1");
    } else {
      stopTimeCount("lower-third-1");
    }
  } else {
    if (!canIn1) {
      canIn1 = true;
      document.getElementById("lower-third-1").classList.remove("hide-anim");
      startActiveCount("lower-third-1");
    }
  }

  // Change the alignment of the lower third.
  if (alt_1_align != alt_1_align_old) {
    if (alt_1_switch == "false") {
      document.getElementById("lower-third-1").classList.add("hide-anim");
    }
    document.getElementById("lower-third-1").classList.replace("left", alt_1_align);
    document.getElementById("lower-third-1").classList.replace("center", alt_1_align);
    document.getElementById("lower-third-1").classList.replace("right", alt_1_align);
  }
  alt_1_align_old = alt_1_align;

  // Change the style of the lower third.
  if (alt_1_style != alt_1_style_old) {
    if (alt_1_switch == "false") {
      document.getElementById("lower-third-1").classList.add("hide-anim");
    }
    document.getElementById("lower-third-1").classList.replace("style-1", "style-" + alt_1_style);
    document.getElementById("lower-third-1").classList.replace("style-2", "style-" + alt_1_style);
    document.getElementById("lower-third-1").classList.replace("style-3", "style-" + alt_1_style);
    //document.getElementById("lower-third-1").classList.replace("style-4", "style-" + alt_1_style);
    //document.getElementById("lower-third-1").classList.replace("style-5", "style-" + alt_1_style);
  }
  alt_1_style_old = alt_1_style;

  ///////////////////////////

  //Load logo when it change
  if (alt_1_logo_image != alt_1_logo_image_old) {
    loadLogo("alt-1-logo-image", alt_1_logo_image);
  }
  alt_1_logo_image_old = alt_1_logo_image;

  //Show or hide if logo switch is ON.
  changeLogoVisibility(alt_1_logo_switch, alt_1_logo_image);

  ///////////////////////////

  let root = document.documentElement;

  // Hide the background shadow if color is transparent (end with ",0)").
  if (alt_1_style_color_2.match(/,0\)$/)) {
    root.style.setProperty("--alt-1-background", "0");
  } else {
    root.style.setProperty("--alt-1-background", "1");
  }

  if (alt_1_shadows == "false") {
    root.style.setProperty("--alt-1-shadows", "none");
    root.style.setProperty("--alt-1-shadows-graph", "none");
  }
  if (alt_1_shadows == "true") {
    root.style.setProperty("--alt-1-shadows", "0.1rem 0.1rem 0.2rem rgba(0,0,0," + alt_1_shadow_amount + ")");
    if (alt_1_background_switch == "false") {
      root.style.setProperty("--alt-1-shadows-graph", "none");
    } else {
      root.style.setProperty("--alt-1-shadows-graph", "0.1rem 0.1rem 0.2rem rgba(0,0,0," + alt_1_shadow_amount + ")");
    }
  }
};

bcf.onmessage = function (ev) {
  received_data = ev.data;
  new_font = received_data.new_font_to_send;

  //console.log(new_font);
  $("head").append("<style>" + new_font + "</style>");
};

function loadLogo(alt, logo) {
  if (logo) {
    $("#" + alt).attr("src", logo);
  } else {
    $("#" + alt).attr("src", "//:0");
  }
}

//Send data to Control Panel
function function_send() {
  let activeTime1_to_send = c1 - 1;
  let inactiveTime1_to_send = d1 - 1;

  if (activeTime1_to_send < 0) {
    activeTime1_to_send = 0;
  }
  if (inactiveTime1_to_send < 0) {
    inactiveTime1_to_send = 0;
  }

  bcr.postMessage({
    activeTime1_to_send,
    inactiveTime1_to_send,
    alt_1_turnoff,
  });

  alt_1_turnoff = false;
}

function refreshData() {
  function_send();
}

const x = 1; // Refresh time multiplier
setInterval(refreshData, x * 1000);
bcr.postMessage({ resend: true });
