import { IGithub } from "./components/icons/github"
import { PdfRender } from "./components/pdf-render"

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b min-h-14">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">PDF Previewer</h1>
          <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
            BETA
          </span>
        </div>
        {/* Custom buttons */}
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/AbianS/pdf-make-preview"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border p-1 text-black"
          >
            <IGithub size={20} />
          </a>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="h-fit w-fit mx-auto bg-white shadow-md">
          <PdfRender />
        </div>
      </main>
    </div>
  )
}

export default App
