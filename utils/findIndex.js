export function findAnchorIndex(lines, anchor) {
    return lines.findIndex(line => line.trim() === anchor);
}


export function findLastImportIndex(lines) {
    return lines.findLastIndex((str) => str.includes("import "));
}