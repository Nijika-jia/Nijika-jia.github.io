export function formatDate(value?: string | Date | null): string {
  if (!value)
    return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  return date.toISOString().slice(0, 10).replaceAll('-', '.')
}
