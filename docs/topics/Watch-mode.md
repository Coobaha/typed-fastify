# Watching for changes

`%pkg%` has a built-in watcher. It will watch for changes, new files and deleted files and re-build the schema on any change.

```json
"watch": "tfs gen -w src/**/*_schema.ts"
```

You can also use `nodemon` or any other watcher that is suitable for your
project.

```json
"watch": "nodemon --watch src/**/*_schema.ts --exec \"tfs gen src/**/*_schema.ts\""
```

<seealso style="links">
       <category ref="misc">
           <a href="https://www.npmjs.com/package/nodemon">Nodemon</a>
           <a href="https://watchexec.github.io/">Watchexec</a>
       </category>
</seealso>
