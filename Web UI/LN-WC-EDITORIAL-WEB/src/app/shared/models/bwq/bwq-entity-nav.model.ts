import { JsonProperty } from 'json2typescript';

export class BwqEntityNav {
  label: string;
  data: string;
  children: Child3[];
}

export class Child3 {
  @JsonProperty('Key', String)
  label?: string;
  children: Child2[];
}

export class Child2 {
  label: string;
  data: string;
  children?: Child[];
  SubGroup?: SubGroup[];
}

export class SubGroup {
  label: string;
  data: string;
}

export class Child {
  label: string;
  data: any;
}

export class BwqEntityData {
  countryName: string;
  categoryName: string;
  batchName: string;
  aging: number;
}

