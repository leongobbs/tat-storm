interface Value {
  value: string;
}

export interface Binding {
  position: Value;
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
