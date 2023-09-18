export function getDataFilePath(at = Date.now()) {
  const when = new Date(at);
  const year = when.getFullYear();
  const month = `${when.getMonth() + 1}`.padStart(2, '0');
  const date = `${when.getDate()}`.padStart(2, '0');

  return `weights_${year}_${month}_${date}.json`;
}

export function getImportMessage(stats) {
  return `Added ${stats.added} measurements\n` +
    ` to ${stats.existing} existing measurements,\n` +
    ` removed ${stats.duplicates} duplicates,\n` +
    ` for a total of ${stats.all}`;
}

export function importData(existing, imported) {
  const added = cleanData(imported);
  const combined = [...existing, ...added];

  combined.sort((a, b) => b.at - a.at);

  const all = combined.filter((item, index) => {
    const last = combined[index - 1];
    return (item?.at !== last?.at);
  });

  return {
    all,
    stats: {
      existing: existing.length,
      added: added.length, 
      duplicates: combined.length - all.length,
      all: all.length,
    },
  };
}

function cleanData(input) {
  const data = Array.isArray(input) ? input : [];
  const cleaned = data.map((item) => {
    const weight = parseFloat(item.weight);
    const itemAt = item.at ? item.at : item.time;
    const at = parseInt(itemAt, 10);

    return {
      at,
      weight,
    };
  });

  return cleaned.filter((item) => (
    item.at && item.weight
  ));
}
