
/*
Big shoutouts to Jorge Gonzalez on stack Overflow for providing this sweet function.
I take no credit for this snipped of code, as I have not written or modified it in any way.
Visit his Stack Overflow page here https://stackoverflow.com/users/2443581/jorge-gonzalez
*/

function getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    var result = null;
    var find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule
                && cssRule.selectorText.toLowerCase() === ruleName;
        });
        return result != null;
    });
    return result;
}

export default getCSSRule
