# Why Is It Always Shifting!!!

A simple extension to see what elements have `overflow: hidden` with
`scrollHeight !== clientHeight`, because those can still shift if an element
inside them becomes focused or is otherwise scrolled to automatically.

## Development

Build everything with `pnpm build`, or watch the files with `pnpm dev`. Check
that things typecheck with `pnpm check`.

Install the unpacked extension from the build `dist` directory. See the [Chrome
Guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)
for help loading an unpacked extension.
