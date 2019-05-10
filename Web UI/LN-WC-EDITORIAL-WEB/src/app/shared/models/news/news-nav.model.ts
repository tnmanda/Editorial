export class NewsNav {
  label: string;
  children: Child2[];
}

class Child2 {
  label: string;
  children: Child[];
}

class Child {
  label: string;
  data: any;
}

export class NewsData {
  appUserID: number;
  watchID: number;
  countryID: number;
  languageID: number;
  languageName: string;
  state: number;
}
