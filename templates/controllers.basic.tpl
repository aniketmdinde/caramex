export function test{{feature | pascalCase}}(req, res) {
  res.send("{{feature | lowercase}} controller working");
}