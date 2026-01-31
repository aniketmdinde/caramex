export function create{{feature | pascalCase}}(req, res) {
  res.send("create{{feature | pascalCase}} controller working");
}

export function get{{feature | pascalCase}}s(req, res) {
  res.send("get{{feature | pascalCase}}s controller working");
}

export function get{{feature | pascalCase}}(req, res) {
  const {id} = req.params;
  res.send("get{{feature | pascalCase}} controller with id " + id + " working");
}

export function update{{feature | pascalCase}}(req, res) {
  const {id} = req.params;
  res.send("update{{feature | pascalCase}} controller with id " + id + " working");
}

export function delete{{feature | pascalCase}}(req, res) {
  const {id} = req.params;
  res.send("delete{{feature | pascalCase}} controller with id " + id + " working");
}