# Public website publishing policy

This repository and its GitHub Pages site are public. They are not a storage location for confidential material. A license or copyright notice does not make published files private.

## Rights

- Reusable website software is Apache-2.0 licensed. See `LICENSE` and `LICENSE-SCOPE.md`.
- Photographs, original editorial text, CV content, personal branding, and scientific illustrations have separate terms in `CONTENT-RIGHTS.md`.
- Preserve existing third-party license and credit requirements. Source-page records do not prove copyright ownership or permission.
- Before adding a photo taken by someone else or a jointly authored/publisher-owned figure, confirm permission or an applicable license. Check consent and context for identifiable people.

## Before publishing

- Keep credentials, patient-level data, unpublished confidential work, job application drafts, and personal documents outside this repository.
- Review a public copy of the CV separately from a private application CV. Decide deliberately whether personal phone numbers belong on the public copy.
- Review photos for location metadata and visible identifying information. Use web-sized copies; keep originals elsewhere.
- Review the exact staged files with `git diff --cached --stat` and `git diff --cached` before committing.
- Do not rely on `robots.txt`, disabled right-click, or hidden URLs for confidentiality.

## Local safeguards

`.gitignore` excludes common private files and raw data formats. It does not affect files already tracked by Git, and can be bypassed with forced staging.

A basic pre-commit guard checks staged paths and common credential patterns without printing matched secrets. It also flags files larger than 10 MB. Enable it in each clone:

```sh
git config core.hooksPath .githooks
```

Python 3 is required. The guard does not inspect binary image/PDF contents, establish copyright ownership, identify all credentials, or determine whether research is confidential. It runs locally, can be bypassed, and does not protect edits made directly on GitHub. Consider GitHub push protection as an additional server-side control.

## If private information was published

Removing a file in a new commit does not remove older versions, forks, downloads, or caches. Revoke exposed credentials first. Plan any history rewrite separately because it changes commit IDs and affects collaborators; do not force-push a history rewrite as a routine update.

GitHub guidance: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
