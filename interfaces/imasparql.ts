interface Value {
  value: string;
}

export interface Binding {
  link: Value;
  icon: Value;
  class: Value;
  count: Value;
  label?: Value;
}

export interface ImasparqlResponse {
  results: {
    bindings: Binding[];
  };
}
