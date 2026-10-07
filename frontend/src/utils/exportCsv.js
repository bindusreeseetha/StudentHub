export function exportCsv(filename, rows) {
  if (!rows.length) return
  const columns = Object.keys(rows[0])
  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
  const csv = [columns.map(escapeCell).join(','), ...rows.map((row) => columns.map((column) => escapeCell(row[column])).join(','))].join('\n')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}