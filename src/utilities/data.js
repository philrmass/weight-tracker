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

export function cleanData(input) {
  const data = Array.isArray(input) ? input : [];
  const cleaned = data.map((item) => {
    const weight = parseFloat(item.weight);
    const itemAt = item.at ? item.at : item.time;
    const at = parseInt(itemAt);

    return {
      at,
      weight,
    };
  });

  return cleaned.filter((item) => {
    return item.at && item.weight;
  });
}
