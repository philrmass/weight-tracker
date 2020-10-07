export function importData(existing, imported) {
  const cleaned = cleanData(imported);
  const combined = [...existing, ...cleaned];

  combined.sort((a, b) => b.at - a.at);

  const uniques = combined.filter((item, index) => {
    const last = combined[index - 1];
    return (item?.at !== last?.at);
  });
  const duplicates = combined.length - uniques.length;
  console.log(`Import\n had ${existing.length}\n add ${cleaned.length}\n dup ${duplicates}\n end ${uniques.length}`);

  return uniques;
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
