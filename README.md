# SR Extraction App

Browser-based structured data extraction from scientific PDFs for systematic reviews.

**[Launch App](https://org-karur-datacenter.github.io/sr-extract-app/)**

## How It Works

1. **Define Template** — Paste columns from Excel or type extraction fields manually
2. **Upload PDFs** — Drop your included study PDFs
3. **Extract** — Each PDF is sent to Gemini AI for structured data extraction
4. **Export** — Download results as XLSX or CSV

## Key Features

| Feature | Detail |
|---------|--------|
| **Spreadsheet template builder** | Paste fields from Excel via clipboard (TSV) |
| **Multi-format templates** | Also supports .xlsx and .docx template uploads |
| **Per-PDF extraction** | Each study extracted via Gemini API individually |
| **Resume support** | Re-run safely — already-extracted PDFs are skipped |
| **Export** | Download as XLSX or CSV with all extracted fields |
| **No installation** | Runs entirely in your browser |

> Part of the [Agentic AI-Powered Systematic Review Pipeline](https://github.com/ORG-Karur-DataCenter)

## Related

- [Extraction Agent (CLI)](https://github.com/ORG-Karur-DataCenter/Systematic_review_extraction_agent) — Full Python pipeline
- [Screening App](https://github.com/ORG-Karur-DataCenter/sr-screen-app) — Browser-based screening

## License

MIT
