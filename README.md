# Research website

This static site collects Shaurya Gupta's work on human review in AI-mediated institutions. The homepage introduces the research questions and links to papers, data, and notebook entries.

## Preview the site

From the repository root, run:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. The site runs without a JavaScript build step.

## Find a page

- [Homepage](index.html) introduces the research.
- [Research](research.html) lists papers and projects.
- [Notebook](notebook.html) collects dated research notes.
- [Lab](lab.html) shows interactive research material.
- [About](about.html) introduces the researcher.
- [Earlier layouts](versions.html) links to the site's previous versions.

Page copy lives in the HTML files and, where pages load it dynamically, in [sample-data.json](data/sample-data.json). See the [architecture notes](ARCHITECTURE.md) for the content schema and the [implementation guide](IMPLEMENTATION_GUIDE.md) for build notes.

## License

The code is MIT-licensed. The site content and design are original.
