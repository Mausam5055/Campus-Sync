# Campus-Sync Report

This directory contains the LaTeX source files for the Campus-Sync comprehensive report.

## Files Structure

```
report/
├── campus_sync_report.tex       # Main LaTeX file
├── test_report.tex              # Simple test file to verify basic compilation
├── test_diagrams.tex            # Test file to verify diagram compilation
├── README.md                    # This file
├── REPORT_SUMMARY.md            # Summary of the report creation
├── chapters/                    # Individual chapter files
│   ├── introduction.tex         # Introduction chapter
│   ├── architecture.tex         # System architecture chapter
│   ├── frontend.tex             # Frontend implementation chapter
│   ├── backend.tex              # Backend implementation chapter
│   ├── features.tex             # Platform features chapter
│   ├── workflow.tex             # System workflows chapter
│   └── future.tex               # Future implementations chapter
```

## Compilation Instructions

To compile the LaTeX report into a PDF, you can use one of the following methods:

### Method 1: Online Compiler (Recommended for beginners)
1. Go to [Overleaf](https://www.overleaf.com/)
2. Sign up or log in
3. Create a new project
4. Upload all files from this directory
5. Compile the project by clicking the "Recompile" button

### Method 2: Local Installation
If you have a LaTeX distribution installed (TeX Live, MiKTeX, or MacTeX):

```bash
# Navigate to the report directory
cd report

# Compile the LaTeX document
pdflatex campus_sync_report.tex
pdflatex campus_sync_report.tex  # Run twice to generate proper table of contents
```

### Method 3: Docker (If you have Docker installed)
```bash
# Navigate to the report directory
cd report

# Compile using a LaTeX Docker container
docker run --rm -v $(pwd):/data blang/latex pdflatex campus_sync_report.tex
docker run --rm -v $(pwd):/data blang/latex pdflatex campus_sync_report.tex  # Run twice for proper TOC
```

## Required LaTeX Packages

The report uses the following packages:
- inputenc, fontenc
- geometry
- graphicx
- amsmath, amssymb
- fancyhdr
- titlesec
- tocloft
- hyperref
- listings, xcolor
- tikz (with arrows, positioning, shapes, fit libraries)
- float
- caption, subcaption
- enumitem
- longtable, booktabs, array, multirow
- pdflscape, afterpage

These packages are included in most standard LaTeX distributions.

## Troubleshooting

If you encounter compilation errors:

1. Make sure all required packages are installed
2. Run the compilation process twice to generate proper table of contents and references
3. Check that all chapter files are present in the chapters/ directory
4. Ensure file paths in the main .tex file match the actual file structure
5. If TikZ errors occur, verify that the positioning library is available

## Output

After successful compilation, you should have a file named `campus_sync_report.pdf` which contains the complete Campus-Sync report with all diagrams and formatting.