module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint-config-google",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": [
          "error",
          120
        ],
    }
};
