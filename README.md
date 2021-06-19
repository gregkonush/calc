# Fractions CLI tool

- Legal operators are `*, /, +, -` (multiply, divide, add, subtract)
- Operands and operators are separated by one or more spaces
- Mixed numbers are represented by whole numerator or denominator. e.g. `3_1/4`
- Improper fractions and whole numbers are also allowed as operands

```bash
calc > 1/2 * 3_3/4
= 1_7/8
calc > 2_3/8 + 9/8
= 3_1/2
```

## How to install and run cli

Install dependencies first

```bash
yarn install
```

Run command itself, it works like a REPL

```bash
./bin/run

# or run

yarn cli
```

To run tests

```bash
yarn test
```

![fraction-cli](./public/fraction-cli.gif)
