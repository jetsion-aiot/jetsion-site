///// Configuration //////

//These vars tell the virtual keyboard where to point its inputs
let currentInputField = undefined;
let currentCaretField = 0;
let selectedInput;

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("focus", onInputFocus);
  input.addEventListener("input", onInputFocus);
  input.addEventListener("change", onInputFocus);
  input.addEventListener("blur", onInputFocusOut);
  // input.addEventListener("touchstart", onTouchStart);
  // input.addEventListener("touchend", onTouchEnd);
  // input.addEventListener("touchcancel", onTouchCancel);
  // input.addEventListener("touchleave", onTouchLeave);
  // input.addEventListener("touchmove", onTouchMove);
});

//vKeyboard functions
function vKeyboardSetToNumericCharset() {
  $(".vKeyboard-number").prop("disabled", false);
  $(".vKeyboard-letter").prop("disabled", true);
  $(".vKeyboard-symbol").prop("disabled", true);
}

function vKeyboardSetToLettersCharset() {
  $(".vKeyboard-number").prop("disabled", true);
  $(".vKeyboard-letter").prop("disabled", false);
  $(".vKeyboard-symbol").prop("disabled", false);
}

function vKeyboardSetToAllCharset() {
  $(".vKeyboard-number").prop("disabled", false);
  $(".vKeyboard-letter").prop("disabled", false);
  $(".vKeyboard-symbol").prop("disabled", false);
}

function vKeyboardOKEnabled() {
  $("#keyboard-enter").prop("disabled", false);
}

function vKeyboardOKDisabled() {
  $("#keyboard-enter").prop("disabled", true);
}

function vKeyboardSymbolDisabled() {
  $(".vKeyboard-symbol").prop("disabled", true);
}

function vKeyboardSymbolEnabled() {
  $(".vKeyboard-symbol").prop("disabled", false);
}

function vKeyboardTiretDisabled() {
  $("#keyboard-tiret").prop("disabled", true);
}

function vKeyboardTiretEnabled() {
  $("#keyboard-tiret").prop("disabled", false);
}

function showKeyboard() {
  // document.getElementById("vKeyboard").style.display = "block";
  $("#vKeyboard").collapse('show');
}

function hideKeyboard() {
  // document.getElementById("vKeyboard").style.display = "none";
  $("#vKeyboard").collapse('hide');
}

//Events handlers
$(document.body).click(function(e) {
  if (e.target.classList.toString().includes("vKeyboard")) {
    return false;
  }
  if ($(e.target).is("input")) {
    return false;
  }

  hideKeyboard();
});
$("#keyboard-enter").click(function() {
  hideKeyboard();
});
$("input").on("click change input", function(e) {
  if (e.target.type == "text") {
    currentInputField = e.target.id;
    currentCaretField = $(`#${currentInputField}`).caret();
  }
});

$(
  ".vKeyboard-number, .vKeyboard-symbol, .vKeyboard-letter, .vKeyboard-return"
).click(function(e) {
  e.preventDefault();
  onVirtualKeyboardPress(e);
  $(`#${currentInputField}`).focus();
});

function onVirtualKeyboardPress(event) {
  if (event.target.id === "keyboard-return" && currentCaretField > 0) {
    let str = $(`#${currentInputField}`).val();
    let char_pos = currentCaretField - 1;

    part1 = str.substring(0, char_pos);
    part2 = str.substring(char_pos + 1, str.length);
    $(`#${currentInputField}`).val(part1 + part2);
    $(`#${currentInputField}`).caret(currentCaretField - 1);
  }

  $(`#${currentInputField}`).caret(event.target.value);
  $(`#${currentInputField}`).trigger("input");
  $(`#${currentInputField}`).change();
}

function onInputFocus(event) {
  selectedInput = `#${event.target.id}`;

  vKeyboardSetToAllCharset();

  if ($(`#${event.target.id}`).hasClass("numeric")) {
    vKeyboardSetToNumericCharset();
  }
  if (event.target.type == "radio") {
    return false;
  }
  if (event.target.type == "label") {
    return false;
  }

  showKeyboard(event.target.id);
}

function onInputFocusOut(event) {
  selectedInput = `#${event.target.id}`;
}

function onChange(input) {
  //virtual keypress
  document.querySelector(selectedInput || ".input").value = input;
  $(`${selectedInput}`).trigger("input");
  $(`${selectedInput}`).trigger("change");
}