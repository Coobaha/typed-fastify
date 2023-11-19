<card-summary>
Add %pkg% to your project and setup generator task to package.json
</card-summary>

# Installation

1. Add package to your project

<tabs>
<tab title="npm">

```bash
npm install %pkg%
```

</tab>
<tab title="yarn">

```bash
yarn add %pkg%
```

</tab>
<tab title="pnpm">

```bash
pnpm add %pkg%
```

</tab>
</tabs>
2. Add generator task to package.json

```json
"gen:schema": "tfs gen src/**/*_schema.ts"
```

You can also add `--watch` flag to watch for changes in your schema files

```json
"dev:schema": "tfs gen src/**/*_schema.ts --watch"
```

3. Setup is complete and you can build your first schema

> See [First schema](First-schema.md) page to learn how to create your first schema.
> {style="note"}

> **To learn more about the cli**
>
> For more information about `tfs` command, see [CLI](CLI-Reference.md) page.
>

<seealso style="links">
       <category ref="related">
           <a href="CLI-Reference.md">Learn more about CLI</a>
           <a href="First-schema.md">Create first schema</a>
       </category>
</seealso>
