module.exports = {
    rules: {
        'body-max-length': [2, "always"],
        'header-max-length': [2, "always", 50],
        'scope-enum': [2, 'always', [
            "comp",
            "build",
            "vcs"
        ]],
        'scope-case': [2, "always", "lower-case"],
        'subject-case': [2, "always", "sentence-case"],
        'subject-full-stop': [2, "never", "."],
        'type-enum': [2, "always", [
            "build",
            "fix",
            "docs",
            "refactor",
            "feat",
        ]],
        'type-case': [2, "always", "lower-case"]
    }
}
