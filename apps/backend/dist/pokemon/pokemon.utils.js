"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayWithNonZeroLength = exports.fetchData = void 0;
const cross_fetch_1 = require("cross-fetch");
async function fetchData(url) {
    const response = await (0, cross_fetch_1.default)(url);
    return response.json();
}
exports.fetchData = fetchData;
function isArrayWithNonZeroLength(input) {
    return Boolean(Array.isArray(input) && input.length);
}
exports.isArrayWithNonZeroLength = isArrayWithNonZeroLength;
//# sourceMappingURL=pokemon.utils.js.map