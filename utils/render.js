export function render(template, data = {}, helpers = {}) {
    return template.replace(/{{\s*([^}]+)\s*}}/g, (_, str) => {
        const parts = str.split("|").map(s => s.trim());

        let value = (data[parts[0]] !== undefined) ? String(data[parts[0]]) : "";

        for(let i=1; i<parts.length; i++) {
            const helper = helpers[parts[i]] || ((v) => v);
            value = String(helper(value) ?? "");
        }
    
        return value;
    });
}
  