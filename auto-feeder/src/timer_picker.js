let setTimerBtn = document.getElementById("set_timer")
let pickerElement = document.getElementById("duration_picker_field");
let formattedDuration = new FormattedDuration(config = {
    hoursUnitString: " hours ",
    minutesUnitString: " mins ",
    secondsUnitString: " secs",
});
let durationPickerMaker = new DurationPickerMaker(formattedDuration);
durationPickerMaker.SetPickerElement(pickerElement, window, document);
setTimerBtn.addEventListener("click", function() {
  let portion = ""
  var radios = document.getElementsByName('portionRadio');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      portion = radios[i].id.slice(12,radios[i].id.length).toLowerCase();
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/set-timer", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    duration: formattedDuration.ToTotalSeconds().toString(),
    portion: portion[0]
  }));
  alertify.message(`timer has been set for ${formattedDuration.ToFormattedString()}, with a ${portion} portion set`);
})