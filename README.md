<h1 align="center">
	PDF Make Previewer</br>
	<a href="https://www.npmjs.org/package/pdf-make-previewer"><img src="https://img.shields.io/npm/v/pdf-make-previewer.svg?style=flat" alt="npm"></a> <a href="https://travis-ci.org/developit/pdf-make-previewer"><img src="https://travis-ci.org/developit/pdf-make-previewer.svg?branch=master" alt="travis"></a> <a href="https://licenses.dev/npm/pdf-make-previewer"><img src="https://licenses.dev/b/npm/pdf-make-previewer" alt="licenses" /></a>
</h1>
<p align="center">CLI and library to <b>visualize your PDF generation in real-time</b>.</p>


## ✨ Features

- 📄 **Real-time PDF Preview:** Visualize PDF changes as you modify your generation logic without needing to regenerate files manually.
- 🛠 **Easy CLI Setup:** Quickly configure and preview your PDFs using the CLI.
- ⚙️ **Customizable Config:** Define your PDF generation logic in a dedicated config file.
- 🛠 **Lightweight:** Simple and focused tool for PDF previewing during development.

## 📚 Documentation

For more information on how to use pdf-make-previewer, check out the [documentation](https://pdf-make-preview.vercel.app/).

## 🚀 Quick Start

Run the following command to set up pdf-make-previewer in your project:

```bash
npx pdf-make-previewer init
```

This will guide you through the setup process and generate a configuration file for your project.

## 📄 Configuration

In the configuration file, import your PDF generation logic. Here’s an example:

```ts
// pdf-preview.config.ts

import type { PdfPreviewerConfig } from "pdf-make-previewer"
import { generatePDF } from './your-pdf-functions';

const config: PdfPreviewerConfig = {
  renderPdfPreview: () => generatePDF({name: 'John Doe', age: 30}),
}

export default config
```

## 🚀 Run the Preview

To start using pdf-make-previewer, run:

```bash
npm run previewer
```

This will open a local server where you can instantly preview any changes made to your PDF generation logic. Make your edits, save the file, and the preview will automatically update in real time. 🔄✨

## 🤝 Contributions

Contributions are welcome. If you find an issue or have an idea to improve react-component-screenshot, feel free to open an issue or submit a pull request. 🚀

## 📜 License

Licensed as MIT open source. 📜