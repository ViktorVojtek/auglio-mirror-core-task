const faceX = 570;
const faceY = 270;
const faceWidth = 250;
const faceHeight = 270;

App();

function App() {
  document.addEventListener("DOMContentLoaded", renderImage);
}

function renderImage() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let ctx = canvas?.getContext("2d", { willReadFrequently: true });

  let img = new Image();

  img.src = "./images/auglioMan.jpg"; // './images/auglioMan-1.png';

  img.onload = () => {
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

    // Calculate total brightness
    const totalBrightness = calculateBrightness(imageData?.data);

    const totalBrightnessElement = document.getElementById(
      "total-brightness"
    ) as HTMLParagraphElement;

    totalBrightnessElement.innerHTML = `Total Brightness: ${totalBrightness}`;
    // End

    // Draw face area rectangle
    drawRectangle(ctx!);

    let faceAreaImageData = ctx!.getImageData(
      faceX,
      faceY,
      faceWidth,
      faceHeight
    );

    // Calculate face area brightness
    let faceBrightness = calculateBrightness(faceAreaImageData.data);
    // End

    // Calculate background brightness
    // by subtracting face area brightness from total brightness
    let backgroundBrightness =
      (totalBrightness * (canvas.width * canvas.height) -
        faceBrightness * (faceWidth * faceHeight)) /
      (canvas.width * canvas.height - faceWidth * faceHeight);

    const backgroundBrightnessElement = document.getElementById(
      "background-brightness"
    ) as HTMLParagraphElement;

    backgroundBrightnessElement.innerHTML = `Background Brightness: ${backgroundBrightness}`;
    // End

    // Calculate contrast
    let totalContrast = calculateContrast(imageData?.data);

    const totalContrastElement = document.getElementById(
      "total-contrast"
    ) as HTMLParagraphElement;
    totalContrastElement.innerHTML = `Total Contrast: ${totalContrast}`;
    // End
  };
}

function calculateBrightness(data: Uint8ClampedArray | undefined) {
  let total = 0;

  if (!data) return total;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const average = (r + g + b) / 3;

    total += average;
  }

  const result = total / (data.length / 4);

  return result;
}

function calculateContrast(data: Uint8ClampedArray | undefined) {
  let contrast = 0;

  if (!data) return contrast;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    contrast += (Math.max(r, g, b) - Math.min(r, g, b)) / 3;
  }

  const result = contrast / (data.length / 4);

  return result;
}

function drawRectangle(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.strokeRect(faceX, faceY, faceWidth, faceHeight);
}
