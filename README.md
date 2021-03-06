# textlint-rule-ja-hiragana-daimeishi

Check easy-to-read Daimeishi(pronouns) written in Hiragana than Kanji.

漢字よりもひらがなで表記したほうが読みやすい代名詞・形式名詞を指摘します。検出には形態素解析を使っています。自動修正にも対応しています。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-hiragana-daimeishi

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-hiragana-daimeishi": true
    }
}
```

Via CLI

```
textlint --rule ja-hiragana-daimeishi README.md
```

### Fixable

```
textlint --fix ja-hiragana-daimeishi README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

    npm test

### List

| From | To |
| --- | --- |
| 彼処 | あそこ |
| 何処 | どこ |
| 何処 | いずこ |
| 貴方 | あなた |
| 何時 | いつ |
| 之 | これ |
| 何れ | いずれ |

## License

MIT © Hiroshi Takase
