# Watching for changes

Currently, `%pkg%` doesn't have a built-in watcher.

If you want your schema to be re-built on changes, you can use `nodemon` or any other watcher that is suitable for your
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
