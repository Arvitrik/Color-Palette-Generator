// A SIMPLE PALETTE GENERATOR

let paletteEl = document.getElementById("palette-container");

// GENERATE COLORS ON 'SPACE' KEY PRESS
document.body.onkeyup = function (e) {
  if (e.key == "" || e.code == "space" || e.keyCode == 32) {
    let generatedColors = [];

    // CREATE AN ARRAY OF 5 RANDOM COLORS
    for (let i = 0; i < 5; i++) {
      generatedColors.push(randomColor());
    }

    // CONVERT FROM HEX TO RGB
    let rgbColors = hexToRgb(generatedColors);

    // SHOW RANDOMLY GENERATED COLORS ON SCREEN
    showColorPelette(generatedColors, rgbColors);
  }
};

// GENERATE RANDOM COLORS
const randomColor = () => {
  let color = "#";
  const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

  for (let i = 0; i < 6; i++) {
    color += range[Math.floor(Math.random() * range.length)];
  }
  return color;
};

// SHOW COLOR PALETTES AND DISPLAY NAMES OF COLORS
const showColorPelette = (colorsHex, colorsRgb) => {
  // CSS Variables
  let opacityBackdropFilter = "opacity(25%)";
  let invertingFilter = "invert(100%)";

  removePreviouslyGeneratedTags();

  // ------------------ ************* -----------------------
  //   CREATE FOLLOWING STRUCTURE: $ = 1-5
  //   <div class="palette palette-$">
  //   <span class="palette-desc palette-desc-$">
  //        <span class="palette-rgb palette-rgb-$"></span>
  //   </span>
  // </div>
  // ------------------ ************* -----------------------

  for (let i = 0; i < 5; i++) {
    let divTag = document.createElement("div");
    let spanTag = document.createElement("span");
    let spanToolTipTag = document.createElement("span");

    // CLASSNAMES
    divTag.className = `palette palette-${i + 1}`;
    spanTag.className = `palette-desc palette-desc-${i + 1}`;
    spanToolTipTag.className = `palette-rgb palette-rgb-${i + 1}`;

    // CSS / STYLING + DISPLAY COLORS
    spanToolTipTag.style.backdropFilter = opacityBackdropFilter;

    spanTag.innerText = colorsHex[i].toUpperCase();
    spanTag.style.color = colorsHex[i];
    spanTag.style.filter = invertingFilter;
    spanTag.style.backdropFilter = opacityBackdropFilter;

    spanToolTipTag.innerText = `rgb(${colorsRgb[i][0]}, ${colorsRgb[i][1]}, ${colorsRgb[i][2]})`;
    spanToolTipTag.style.color = colorsHex[i];

    divTag.style.backgroundColor = colorsHex[i];

    // APPEND TO THE DOM
    spanTag.appendChild(spanToolTipTag);
    divTag.appendChild(spanTag);
    paletteEl.appendChild(divTag);

    // ADD EVENTS
    // addEventListener(type, listener, useCapture(default false))
    spanTag.addEventListener("click", copyText, true);
    spanToolTipTag.addEventListener("click", copyText);
  }
};

// REMOVES PREVIOUS GENERATED DATA / COLORS ON SPACE KEY PRESS
const removePreviouslyGeneratedTags = () => {
  let removeTags = document.getElementsByClassName("palette");
  let arrRemoveTags = Array.from(removeTags);

  // EMPTY ARRAY OF PREVIOUS PALETTES
  arrRemoveTags.forEach((elem) => elem.remove());
};

// COPY TEXT TO CLIPBOARD
const copyText = async (evt) => {
  // GENERATE ALERT WHEN COPYING NOT PERMITTED BY BROWSER
  if (!navigator.clipboard)
    return alert(
      "Copying not permitted by your Browser!!! Enable it in settings..."
    );

  let copiedText = evt.currentTarget.firstChild.data;

  // COPY COLOR NAME (HEX/RGB) OR SHOW ERROR
  try {
    await navigator.clipboard.writeText(copiedText);

    // INVOKE FUNCTION: SUCCESS ALERT FOR CLIPBOARD COPY
    showSuccessMsg();
  } catch (err) {
    console.error("failed to copy:-- ", err);
  }
};

// CONVERT HEX TO RGB
function hexToRgb(colorArray) {
  let rgb = [];
  colorArray.forEach((color) => {
    let regEx = new RegExp(/[0-9a-f]{2}/g);
    let digits = color.match(regEx);

    rgb.push([
      parseInt(digits[0], 16),
      parseInt(digits[1], 16),
      parseInt(digits[2], 16),
    ]);
    return rgb;
  });
  return rgb;
}

// SHOW SUCCESS ALERT FOR CLIPBOARD COPY
function showSuccessMsg() {
  let successMsg = document.getElementById("copySuccess");
  successMsg.classList.add("active");
  setTimeout(() => successMsg.classList.remove("active"), 1000);
}
