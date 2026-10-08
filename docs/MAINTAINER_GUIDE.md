# Maintainer Guide

This document outlines standard procedures for maintaining CodeGraph, ensuring quality, and facilitating contributor interactions.

## Triaging Issues

When a new issue is submitted:
1. **Verify Reproducibility:** Ensure bug reports have clear, reproducible steps or fixtures.
2. **Apply Labels:** Categorize the issue (e.g., `bug`, `feature`, `parser`, `analyzer-soroban`). 
3. **Assess Complexity:** If appropriate for external contributors, assign a complexity label (`complexity:trivial`, `complexity:medium`, `complexity:high`).
4. **Determine Readiness:** An issue is "ready" when it clearly states the background, the scope of files to modify, the acceptance criteria, and how to test the changes.

## Reviewing PRs Quickly

To maintain momentum:
1. **Check CI:** Only review PRs where CI (linting, tests) is passing.
2. **Focus on Golden Tests:** For parser changes, ensure golden test fixtures have been added and that the snapshot changes correctly reflect the intent.
3. **First Pass within 48 Hours:** Provide at least a preliminary review or acknowledge the PR within 48 hours to keep contributors engaged.
4. **Constructive Feedback:** Be explicit about what needs changing. If the change is small, consider suggesting the commit directly.

## Contributor Program Operations Checklist

If participating in an active structured contributor program:
- [ ] **Daily Check:** Monitor the issue tracker and PR queue daily.
- [ ] **Assign Fast:** Assign contributors to requested issues promptly to avoid blocking them.
- [ ] **Ensure Issue Clarity:** Make sure all open program issues have clear acceptance criteria and zero ambiguity.
- [ ] **Review Fast:** Provide actionable feedback or merge PRs to keep the queue flowing.
- [ ] **Close and Mark:** Ensure issues are marked resolved before the program wave ends to guarantee contributors receive credit.
