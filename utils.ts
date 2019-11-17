export function downloadFile(url, filename) {
  fetch(url).then(function(t) {
    return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      }
    );
  });
}
