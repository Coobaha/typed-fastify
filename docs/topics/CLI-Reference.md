# CLI Reference

`%pkg%` provides a command-line interface (CLI) for generating files.

## Generate schema

```shell
%cli% gen <file>
```

## Options

file
: Can be one or more file names or glob patterns.

### Other Options

--watch, -w
: Watches files for changes and re-runs generation on change.

--version
: Displays version information.

--help
: Displays help.

### Examples

Single file

```shell
%cli% gen src/example_schema.ts
```

Multiple files

```shell
%cli% gen src/example_schema.ts src/example_schema2.ts
```

Glob pattern

```shell
%cli% gen 'src/**/*_schema.ts'
```

Glob pattern with watch

```shell
%cli% gen 'src/**/*_schema.ts' -w
```

