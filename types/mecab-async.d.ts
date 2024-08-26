// mecab.d.ts

declare module "mecab-async" {
  interface MeCabResult {
    kanji: string;
    lexical: string;
    compound: string;
    compound2: string;
    compound3: string;
    conjugation: string;
    inflection: string;
    original: string;
    reading: string;
    pronunciation: string;
  }

  interface MeCabOptions {
    encoding?: string;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    shell?: boolean | string;
    uid?: number;
    gid?: number;
    windowsHide?: boolean;
  }

  class MeCab {
    command: string;
    options: MeCabOptions;
    parser: (data: string[]) => MeCabResult | null;

    constructor();

    parse(
      str: string,
      callback: (err: Error | null, result: string[][]) => void
    ): void;
    parseSync(str: string): string[][];

    parseFormat(
      str: string,
      callback: (err: Error | null, result: MeCabResult[]) => void
    ): void;
    parseSyncFormat(str: string): MeCabResult[];

    wakachi(
      str: string,
      callback: (err: Error | null, result: string[]) => void
    ): void;
    wakachiSync(str: string): string[];
  }

  export default MeCab;
}
