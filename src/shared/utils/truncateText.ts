/** 길면 잘라내고 말줄임표를 붙인다. 반환 길이는 maxLength를 넘지 않는다 */
export function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1)}…`
}
