import * as pdfMake from "pdfmake/build/pdfmake"
import "pdfmake/build/vfs_fonts"
import type { TDocumentDefinitions } from "pdfmake/interfaces"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

interface SharedData {
  previewData?: TDocumentDefinitions
  message?: string
}

export function PdfRender() {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [sharedData, setSharedData] = useState<SharedData>({})

  useEffect(() => {
    const evtSource = new EventSource("/events")
    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setSharedData(data)
    }

    return () => {
      evtSource.close()
    }
  }, [])

  useEffect(() => {
    if (sharedData?.previewData) {
      try {
        const pdfDocGenerator = pdfMake.createPdf(sharedData.previewData)
        pdfDocGenerator.getBlob((blob) => {
          setPdfBlob(blob)
          console.log(blob)
        })
      } catch (error) {
        console.error("Error al generar el PDF:", error)
      }
    }
  }, [sharedData])

  return (
    pdfBlob && (
      <Document
        renderMode="canvas"
        file={pdfBlob}
        onLoadError={(error) => console.error("Error al cargar el PDF:", error)}
      >
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    )
  )
}
