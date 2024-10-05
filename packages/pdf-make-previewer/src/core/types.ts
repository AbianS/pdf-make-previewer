import type { TDocumentDefinitions } from "pdfmake/interfaces"

export interface PdfPreviewerConfig {
  renderPdfPreview: () => TDocumentDefinitions
}

export interface SharedData {
  previewData?: TDocumentDefinitions
  message?: string
}
