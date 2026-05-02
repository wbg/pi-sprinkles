# pi-sprinkles

⚠️ **WARNING: Pure slop, only for my personal use. You have been warned.** ⚠️

Tiny helpers for [pi](https://github.com/badlogic/pi).

## Install

```bash
pi install https://github.com/wbg/pi-sprinkles
```

## What's included

### `get_current_model` tool

Registers a tool so the LLM can query which model it's running as — instead of guessing.

### Extended Defaults

Injects lightweight conventions into the system prompt on every turn:

- **Git Assisted-by trailer** — follows the [Linux kernel convention](https://docs.kernel.org/process/coding-assistants.html). Commits get an `Assisted-by: pi:<model>` trailer using the actual model from `get_current_model`.

## License

MIT
