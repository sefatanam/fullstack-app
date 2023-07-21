export function ToChipTransform(data: Array<{ name: string }>) {
  if (!data.length) return [];
  const transformedData = data
    .filter((el) => el.name.trim() !== '')
    .map((el) => el.name)
    .join(',')
    .split(',');
  return transformedData;
}
