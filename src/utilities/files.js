export function saveData(filePath, data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filePath;
  link.click();

  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 0);
}

export function loadData() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(JSON.parse(reader.result));
      };
      reader.readAsText(file);
    };

    input.click();
  });
}
