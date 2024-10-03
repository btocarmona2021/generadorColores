function lightenDarkenColor(col, amt) {
    let usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let g = ((num >> 8) & 0x00FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    let b = (num & 0x0000FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (usePound ? "#" : "") + (r.toString(16).padStart(2, '0')) + (g.toString(16).padStart(2, '0')) + (b.toString(16).padStart(2, '0'));
}

function generatePalette() {
    const baseColor = document.getElementById("colorPicker").value;
    const shades = [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
    const palette = document.getElementById("colorPalette");
    const cssOutput = document.getElementById("cssOutput");

    let cssVariables = ":root {\n";
    palette.innerHTML = "";

    shades.forEach((shade, index) => {
        const color = lightenDarkenColor(baseColor, shade * 5);
        const variableName = `--color-blue-${(index + 1) * 100}`;
        cssVariables += `  ${variableName}: ${color};\n`;

        // Crear vista previa de colores
        const colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = color;
        palette.appendChild(colorDiv);
    });

    cssVariables += "}";

    cssOutput.firstChild.nodeValue = cssVariables;
    document.getElementById("copyConfirmation").style.display = "none";
}

function copyToClipboard() {
    const cssOutput = document.getElementById("cssOutput").textContent;
    navigator.clipboard.writeText(cssOutput).then(() => {
        document.getElementById("copyConfirmation").style.display = "block";
    });
}
