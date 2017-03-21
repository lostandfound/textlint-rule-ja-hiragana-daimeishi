"use strict";

const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    // no problem
    "text",
  ],

  invalid: [
    // single match
    {
      text: "何処に",
      output: "どこに",
      errors: [{
        message: "ひらがなで表記したほうが読みやすい代名詞: \"何処\" => \"どこ\"",
        line: 1,
        column: 1
      }]
    },
    // multiple match
    {
      text: `あの小舎を、彼処に置いておくのだろう。

何時も愉快そうな顔をしている女で`,
      output: `あの小舎を、あそこに置いておくのだろう。

いつも愉快そうな顔をしている女で`,
      errors: [{
          message: "ひらがなで表記したほうが読みやすい代名詞: \"彼処\" => \"あそこ\"",
          line: 1,
          column: 7
        },
        {
          message: "ひらがなで表記したほうが読みやすい代名詞: \"何時も\" => \"いつも\"",
          line: 3,
          column: 1
        }
      ]
    }
  ]

});