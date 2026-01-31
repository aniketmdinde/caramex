function formatLog(symbol, message) {
    return `${symbol} ${message}`;
}

export const logger = {
    info: (msg) => console.log(formatLog("▶", msg)),
    success: (msg) => console.log(formatLog("✔", msg)),
    warn: (msg) => console.warn(formatLog("⚠", msg)),
    error: (msg) => console.error(formatLog("❌", msg)),
}