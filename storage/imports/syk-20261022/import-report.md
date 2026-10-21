# SYK staging import — October 13, 2026

Completed only on `https://syk.on-forge.com/`, using the checkout and shared storage beneath `/home/forge/syk.on-forge.com`.

- 152 submissions imported: 124 new books and 28 updated books.
- 156 image files imported and indexed: all 152 sheet-linked covers plus 4 unassigned folder images.
- 714 store links imported, including four regional Amazon links per book.
- Every imported public catalog field was checked against the prepared JSON.
- All unrelated existing books were checked against a pre-import snapshot and remained unchanged.
- Existing slugs, enabled statuses, and publish dates were preserved.
- The catalog now has 445 books.
- The staging queue finished with zero waiting, reserved, delayed, or failed jobs.

The source Sheet was read without modification. Emails, actual names, consent responses, and other administrative submission fields were excluded.

## Sources

- [Google Sheet](https://docs.google.com/spreadsheets/d/1A7z8kC1nBvaVys-hnZBSX3wGGH5nPwK2hxxMEnlBmoQ/edit)
- [Cover folder](https://drive.google.com/drive/folders/1LIq__1WDRnV0ulO0qaxV_uOVQBHd0bJd7goZZJ8FsuUYRXKLA2WpO1zGEJzWEuBcnHCClKtS)

## Import configuration

Feed Me feed 16 imports new books and matches title plus author. Feed 17 updates existing books by their verified Craft IDs. Matching during preparation ignores punctuation, whitespace, and capitalization differences. The different authors' books titled “Hunted” remain separate entries.

Both feeds use private JSON files beneath `/home/forge/syk.on-forge.com/shared/imports/syk-20261022`. Database backups and a pre-import catalog snapshot were saved on staging. The original feed 15 was preserved.

## Normalization

- Missing HTTP schemes were added to store URLs.
- “No romance at all” maps to an empty romance relation; other choices map to the existing romance categories.
- Explicit violence and language map to their categories. “Spicy” maps to the Sex category. The explicit switch is enabled when any of these categories is present.
- The 22 submissions marked below full-novel length have Short Read enabled.
- Row 77 supplied a nine-character Amazon ASIN for Karen Brady’s “Unknown Caller.” The import uses `B0HKN58T8T`, verified from the Amazon link on [the author's website](https://karenbradyauthor.com/). The Sheet itself was not changed.

Detailed checks are saved in `verification-full.json` and `image-inventory-verification.json` beside this report. The public import payload is `books.json`.
