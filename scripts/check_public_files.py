#!/usr/bin/env python3
"""Basic staged-file guard for a public academic website; not a complete secret scanner.
SPDX-License-Identifier: Apache-2.0
"""
from pathlib import PurePosixPath
import re
import subprocess
import sys

SECRET_PATTERNS = {
    "private key": rb"-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----",
    "GitHub token": rb"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b",
    "AWS access key": rb"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b",
    "Google API key": rb"\bAIza[0-9A-Za-z_-]{35}\b",
    "Slack token": rb"\bxox[baprs]-[0-9A-Za-z-]{20,}\b",
    "possible hardcoded credential": rb"(?i)(?:api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*[\x22\x27][A-Za-z0-9_+/=-]{16,}[\x22\x27]",
}
PRIVATE_DIRS = {"private", "confidential", "drafts", "backups", "raw-data", "node_modules", ".venv", ".codex", ".agents"}
DATA_SUFFIXES = {".h5ad", ".h5", ".hdf5", ".rds", ".rdata", ".fastq", ".fq", ".bam", ".sam", ".cram", ".vcf", ".p12", ".pfx", ".key", ".pem"}
BINARY_MEDIA = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf", ".woff", ".woff2"}

def main():
    names = subprocess.check_output(["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"]).decode().split("\0")
    failures = []
    checked = 0
    for name in filter(None, names):
        path = PurePosixPath(name)
        lower = name.lower()
        base = path.name.lower()
        suffixes = {suffix.lower() for suffix in path.suffixes}
        if (PRIVATE_DIRS.intersection(part.lower() for part in path.parts)
                or (base.startswith(".env") and base != ".env.example")
                or base in {"credentials.json", "secrets.json", "id_rsa", "id_ed25519"}
                or suffixes.intersection(DATA_SUFFIXES)):
            failures.append((name, "private, credential, or raw-data path"))
            continue
        size = int(subprocess.check_output(["git", "cat-file", "-s", ":" + name]))
        if size > 10 * 1024 * 1024:
            failures.append((name, "file exceeds 10 MB; review before publishing"))
            continue
        checked += 1
        if path.suffix.lower() in BINARY_MEDIA:
            continue
        data = subprocess.check_output(["git", "show", ":" + name])
        for label, pattern in SECRET_PATTERNS.items():
            if re.search(pattern, data):
                failures.append((name, label))
    if failures:
        print("Commit stopped: review these files before publishing.", file=sys.stderr)
        for name, reason in failures:
            print(f"  {name}: {reason}", file=sys.stderr)
        print("No matched credential values are printed. Unstage private files and keep them outside the public repository.", file=sys.stderr)
        return 1
    print(f"Public-file guard: {checked} staged files checked. Review photo/PDF content and metadata separately.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
