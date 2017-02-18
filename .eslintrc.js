/* eslint 'no-magic-numbers': 'off' */
/* eslint-env node */

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: false
    }
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    commonjs: false,
    'shared-node-browser': true,
    es6: true,
    worker: true,
    amd: false,
    mocha: false,
    jasmine: false,
    jest: false,
    phantomjs: false,
    protractor: false,
    qunit: false,
    jquery: false,
    prototypejs: false,
    shelljs: false,
    meteor: false,
    mongo: false,
    applescript: false,
    nashorn: false,
    serviceworker: false,
    atomtest: false,
    embertest: false,
    webextensions: false,
    greasemonkey: false
  },
  plugins: [
    'babel',
    'json'
  ],
  globals: {
    safari: true
  },
  rules: {
    /**
     * Possible Errors
     */
    'no-await-in-loop': 'off',
    'no-cond-assign': [
      'error',
      'always'
    ],
    'no-console': 'off',
    'no-constant-condition': [
      'error',
      {
        checkLoops: true
      }
    ],
    'no-control-regex': 'error',
    'no-debugger': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: false
      }
    ],
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': [
      'error',
      'all'
    ],
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': [
      'error',
      'both'
    ],
    'no-invalid-regexp': [
      'error',
      {
        allowConstructorFlags: [
          'u',
          'y'
        ]
      }
    ],
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false
      }
    ],
    'no-obj-calls': 'error',
    'no-prototype-builtins': 'off',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'use-isnan': 'error',
    'valid-jsdoc': [
      'warn',
      {
        prefer: {
          returns: 'return'
        },
        preferType: {
          object: 'Object',
          function: 'Function',
          class: 'Class',
          method: 'Method'
        },
        requireReturn: false,
        requireReturnType: true,
        matchDescription: '',
        requireParamDescription: true,
        requireReturnDescription: true
      }
    ],
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true
      }
    ],

    /**
     * Best Practices
     */
    'accessor-pairs': 'off',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: []
      }
    ],
    complexity: 'off',
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: false
      }
    ],
    curly: 'error',
    'default-case': [
      'error',
      {
        commentPattern: '^skip default'
      }
    ],
    'dot-location': [
      'off',
      'property'
    ],
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
        allowPattern: ''
      }
    ],
    eqeqeq: [
      'error',
      'always'
    ],
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'off',
    'no-empty-function': [
      'error',
      {
        allow: []
      }
    ],
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-eval': [
      'error',
      {
        allowIndirect: false
      }
    ],
    'no-extend-native': [
      'error',
      {
        exceptions: []
      }
    ],
    'no-extra-bind': 'error',
    'no-extra-label': 'off',
    'no-fallthrough': [
      'error',
      {
        commentPattern: ''
      }
    ],
    'no-floating-decimal': 'error',
    'no-global-assign': [
      'error',
      {
        exceptions: []
      }
    ],
    'no-implicit-coercion': [
      'error',
      {
        boolean: true,
        number: true,
        string: true
      }
    ],
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignore: [],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: true
      }
    ],
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          Property: false,
          BinaryExpression: false,
          VariableDeclarator: false,
          ImportDeclaration: false
        }
      }
    ],
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'off',
    'no-octal-escape': 'off',
    'no-octal': 'error',
    'no-param-reassign': 'off',
    'no-proto': 'error',
    'no-redeclare': [
      'error',
      {
        builtinGlobals: false
      }
    ],
    'no-restricted-properties': [
      'error',
      {
        object: '',
        property: '',
        message: ''
      }
    ],
    'no-return-assign': [
      'error',
      'always'
    ],
    'no-return-await': 'off',
    'no-script-url': 'error',
    'no-self-assign': [
      'error',
      {
        props: false
      }
    ],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false
      }
    ],
    'no-unused-labels': 'off',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-warning-comments': [
      'error',
      {
        terms: [
          'todo',
          'fixme'
        ],
        location: 'start'
      }
    ],
    'no-with': 'error',
    'prefer-promise-reject-errors': 'off',
    radix: [
      'error',
      'always'
    ],
    'require-await': 'error',
    'vars-on-top': 'off',
    'wrap-iife': [
      'error',
      'inside',
      {
        functionPrototypeMethods: false
      }
    ],
    yoda: [
      'error',
      'always'
    ],

    /**
     * Strict
     */
    strict: 'off',

    /**
     * Variables
     */
    'init-declarations': [
      'error',
      'always'
    ],
    'no-catch-shadow': 'error',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-restricted-globals': 'off',
    'no-shadow-restricted-names': 'error',
    'no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: []
      }
    ],
    'no-undef-init': 'off',
    'no-undef': [
      'error',
      {
        typeof: true
      }
    ],
    'no-undefined': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '',
        args: 'after-used',
        argsIgnorePattern: '',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^skip'
      }
    ],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true
      }
    ],

    /**
     * Node.js and CommonJS
     */
    'callback-return': 'off',
    'global-require': 'off',
    'handle-callback-err': 'off',
    'no-mixed-requires': 'off',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    'no-restricted-modules': 'off',
    'no-sync': 'off',

    /**
     * Stylistic Issues
     */
    'array-bracket-spacing': [
      'error',
      'never',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    'block-spacing': 'off',
    'brace-style': [
      'error',
      'stroustrup',
      {
        allowSingleLine: false
      }
    ],
    camelcase: [
      'error',
      {
        properties: 'always'
      }
    ],
    'capitalized-comments': 'off',
    'comma-dangle': [
      'error',
      'never'
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [
      'error',
      'last',
      {
        exceptions: {
          ArrayExpression: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false
        }
      }
    ],
    'computed-property-spacing': [
      'error',
      'never'
    ],
    'consistent-this': 'off',
    'eol-last': [
      'error',
      'always'
    ],
    'func-call-spacing': [
      'error',
      'never'
    ],
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false
      }
    ],
    'func-names': [
      'error',
      'never'
    ],
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: false
      }
    ],
    'id-blacklist': 'off',
    'id-length': [
      'error',
      {
        min: 3,
        properties: 'always',
        exceptions: [
          'id',
          'to',
          'fs'
        ]
      }
    ],
    'id-match': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameteres: 1,
          body: 1
        },
        FunctionExpression: {
          parameteres: 1,
          body: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-double'
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'line-comment-position': 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true
      }
    ],
    'lines-around-directive': [
      'error',
      'always'
    ],
    'max-depth': [
      'error',
      {
        max: 4
      }
    ],
    'max-len': 'off',
    'max-lines': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements-per-line': [
      'error',
      {
        max: 1
      }
    ],
    'max-statements': 'off',
    'multiline-ternary': [
      'error',
      'never'
    ],
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: true,
        capIsNewExceptions: [
          'Inject'
        ],
        properties: true
      }
    ],
    'new-parens': 'error',
    'newline-after-var': [
      'error',
      'always'
    ],
    'newline-before-return': 'error',
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 2
      }
    ],
    'no-array-constructor': 'error',
    'no-bitwise': [
      'error',
      {
        allow: [],
        int32Hint: false
      }
    ],
    'no-continue': 'off',
    'no-inline-comments': 'off',
    'no-lonely-if': 'error',
    'no-mixed-operators': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0
      }
    ],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-plusplus': 'off',
    'no-restricted-syntax': [
      'off',
      'FunctionExpression',
      'WithStatement'
    ],
    'no-tabs': 'error', // spaces: tabs
    'no-ternary': 'off',
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allowAfterSuper: true
      }
    ],
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: true
      }
    ],
    'no-whitespace-before-property': 'error',
    'object-curly-newline': [
      'error',
      'always'
    ],
    'object-curly-spacing': 'error',
    'object-property-newline': [
      'error',
      {
        allowMultiplePropertiesPerLine: false
      }
    ],
    'one-var-declaration-per-line': [
      'error',
      'always'
    ],
    'one-var': [
      'error',
      'never'
    ],
    'operator-assignment': [
      'error',
      'always'
    ],
    'operator-linebreak': [
      'error',
      'after'
    ],
    'padded-blocks': [
      'error',
      'never'
    ],
    'quote-props': [
      'error',
      'as-needed',
      {
        keywords: false,
        unnecessary: true,
        numbers: false
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: false
      }
    ],
    'require-jsdoc': [
      'off',
      {
        require: {
          FunctionDeclaration: true,
          ClassDeclaration: true,
          MethodDefinition: true,
          ArrowFunctionExpression: false
        }
      }
    ],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: false
      }
    ],
    'sort-keys': 'off',
    'sort-vars': 'off',
    'space-before-blocks': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      'error',
      'always'
    ],
    'unicode-bom': 'off',
    'wrap-regex': 'off',

    /**
     * ECMAScript 6
     */
    'arrow-body-style': [
      'error',
      'as-needed'
    ],
    'arrow-parens': [
      'error',
      'always',
      {
        requireForBlockBody: false
      }
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'constructor-super': 'error',
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'no-class-assign': 'error',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: false
      }
    ],
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true
      }
    ],
    'no-new-symbol': 'error',
    'no-restricted-imports': 'off',
    'no-this-before-super': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }
    ],
    'no-var': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: false,
        ignoreConstructors: false,
        avoidExplicitReturnArrows: false
      }
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': [
      'error',
      'never'
    ],
    'sort-imports': 'off',
    'symbol-description': 'error',
    'template-curly-spacing': [
      'error',
      'never'
    ],
    'yield-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],

    /**
     * Babel
     */
    'babel/new-cap': 'warn',
    'babel/object-curly-spacing': 'warn',
    'babel/no-invalid-this': 'error',
    'babel/no-await-in-loop': 'error'
  }
};
