export function ToChipTransform(data: Array<{ name: string }>) {
  return data
    .map((el) => el.name)
    .join(',')
    .split(',');
}
