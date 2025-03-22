export const exportToCSV = <T extends Record<string, any>>(data: T[], filename: string) => {
  if (!data || data.length === 0) {
    console.error("No data to export")
    return
  }

  // Get headers from the first object
  const headers = Object.keys(data[0])

  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          // Handle values that might contain commas or quotes
          const value = row[header]
          const valueStr = value === null || value === undefined ? "" : String(value)

          // If the value contains commas, quotes, or newlines, wrap it in quotes
          if (valueStr.includes(",") || valueStr.includes('"') || valueStr.includes("\n")) {
            // Replace any quotes with double quotes (escape quotes)
            return `"${valueStr.replace(/"/g, '""')}"`
          }
          return valueStr
        })
        .join(","),
    ),
  ].join("\n")

  // Create a blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

