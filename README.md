# ソフトウェアアーキテクチャの課題用プログラム
これは授業用に作成されたプログラムです。共有メモWebサービス作成を目指します。  
詳しい仕様はソフトウェアアーキテクチャのpdfファイルを参照してください。

## 環境構築
まずはnodejsをインストールしてください。  
このプログラムはnodejs v14.17.6で動作しますが、インストール方法は記載しません。  
vscodeで書くことを強くおすすめします。
他のエディタだとリント(eslint, prettier)の恩恵を受けられません。（多分）  
とりあえず本プログラムをクローン、環境構築して手元に落としましょう。
```
git clone https://github.com/fhac-koh/SoftwareArchAssignment
cd SoftwareArchAssignment
npm i
```
あとvscodeの拡張機能はリコメンドされるので全部インストしといてください。  
リントが動くし修正されたくないファイル（このファイル）に対してvscodeのフォーマッターが動作しないようにしているので。  
あとプロジェクトルートに.envファイルを作成して下記をコピペしてください。
```
REACT_APP_SERVER_HOST="http://localhost:3000"
```

## 実行
`npm run`でスクリプト実行します。
`package.json`の`script`欄に書いているので内訳を示します。
```
npm run dev // サーバとクライアントを並行実行する。開発中はこれを主に使う。
        server // サーバのみを起動する。
        client // クライアントのみを起動する。
        build // プロダクトとしてビルドする。多分使わないけど一応。
        start // ビルドされたやつを実行する。
        fix // コードチェックを行い修正する。コミットする前にやってほしい。
        lint // コードチェックを行う。フィクスはされないので確認するならこっち。
        fix:prettier, fix:eslint // fixの元。使わない。
        lint:prettier, lint:eslint // lintの元。これも使わない。
```
`lint:prettier`は修正すべきファイルの一覧しか出ません。逆に`lint:eslint`はprettierで設定していないフォーマットエラーに対してdiff表示が出てきます。  
prettierのフォーマット設定に関してはファイルのとこを探すしかないです。  
`dev`はサーバがポート番号3000、クライアントは8080。8080でアクセスしてください。  
`server`は3000番。
`client`は8080番。

## 書き方とかコーディング規約とか
なるだけ統一したコーディングを行いたいので規約を貼っつけます。  
一応コード品質保持のためにeslintとprettierを使いますが、引っかかると面倒なので。

### 変数の定義
基本は`const`を使ってください。**`var`宣言は絶対ダメ。**  
これはjsの過去の負債で、変数の巻き上げ（変数のゴミが残る現象）が起きてスコープがめちゃくちゃになり面倒なことになります。  
そのかわり`let`宣言が作られたけど再代入しなければならないなど**やむを得ない理由がない限りはconst一択**で。jsの鉄則なので。  
一応言っておきますが、forループなどはconstで回せますしオブジェクト操作はconstでもできます。配列の追加とかプロパティ変更とかね。  
**また型はつけてください**。**最悪anyでもいいので**。じゃないとtsの意味がありません。  
基本形はTYPEを型として
```
const hoge: TYPE = variable;
または
let fuga: TYPE (= init_variable);
fuga = variable;
```
です。文終端はセミコロンをつけてください。つけなくてもlintが勝手につけますが。  
TYPEにはOR演算子`|`を使って複数の型を持てる型にしてもいいです。
とりあえず型をつけてください。  
またinit_variableがなく、再代入のされていない変数を参照するとエラーになります。tsの強みですね。  
再代入せずにundefinedでも参照したい場合は型にundefinedをOR演算子で入れてください。  
ちなみに型の部分を工夫すると代入値を特定の文字列や数値などにすることができます。  
`null`も`undefined`も特定の代入値としての型をつけることができますが、**nullにundefinedは入れられません**。**逆もしかりです**。
そのことについてはググってください。

### 読み込み専用
前述どおり`const`は再代入だけを認めないだけで変更は認められます。  
変更不可にしたい場合は型定義前の`readonly`修飾子またはリテラル後ろに`as const`修飾子を使います。
```
const hoge: readonly TYPE = init_variable;
const fuga = [1, 2, 3] as const;
function foo(piyo: readonly TYPE): TYPE {
    ...
}
```
ただし、`readonly`にした変数は**基本的にその変数が変更可能な変数に代入することや関数の変更可能な引数に渡すことができません**。
```
const hoge: readonly TYPE = init_variable;
const fuga = hoge; // error
function foo(piyo: TYPE): TYPE {
    ...
}
const piyo: TYPE = foo(hoge) // error
```
キャストみたいなことをすればできないことはない(`as TYPE`修飾子)ですが、今回は使ってはいけません。
なので読み込み専用を使うときは慎重に。

### 文字列リテラルの囲み
eslintで勝手にダブルクォートに変わると思いますが、ダブルクォートを使ってください。

### 配列などにおける暗黙型の利用
型推論は明らかな場合は使っていいです。
```
const hoge = ["a", "b", "c"];
const fuga = [123, 456, 789];
```
など。ただし、タプルの場合は型を明記してください。

### 配列について
配列のデータ取り出しやコピーは分割代入かスプレッド構文を使ってください。
```
const hoge = ["a", "b", "c"];
const [a, b, c] = hoge // a = "a", b = ...
const [,...fuga] = hoge // fuga = ["b", "c"]
```
配列の要素チェックは`includes()`で一発なのでそっちを。

### オブジェクトについて
オブジェクトはレコードとして使ってください。
どういうことかは「辞書用途のオブジェクト」を見てください。  
キー名に変数を入れるときは`[]`が使えます。
```
const key: string = "hoge";
const obj = {
    [key]: "fuga"
}
```
データの取り出し、アクセスには分割代入、スプレッド構文またはオプショナルチェイニングである`?.`アクセスを使ってください。
```
const obj = {
    hoge: foo,
    fuga: bar,
    piyo: baz
}
const {h, f, p} = obj;
const {h, ...other} = obj;
const h = obj?.hoge
```
`?.`アクセスは途中でnullish(nullかundefined)のときにはundefinedを返します。  
ディープコピーや結合はスプレッド構文を使ってください。
```
const obj = {
    hoge: foo,
    fuga: bar,
    piyo: baz
}
const copy = {...obj};
```

### JSONについて
オブジェクトをJSONに変換する`stringify`を使用するときは第2引数以降をnull, 2にしてください。  
そうすると見やすくなるので。
```
const obj = {
    key: value
};
const json = JSON.stringify(obj, null, 2)
```

### 辞書用途のオブジェクト
辞書用途のオブジェクトはキーが固定の文字列のみが与えられるため辞書としては扱いにくい。（数値が使えない）
逆に`Map`や`Set`だとキーバリューを両方、または片方でループを回せるのでオブジェクトより使いやすい。のでキー可変の連想配列で型が常に一定なら辞書用途はこちらを使う。  
Weak(Map/Set)という弱参照キャッシュも使えるらしいので。
```
const map = new Map<TYPE, TYPE>([
    [hoge, foo],
    [fuga, bar]
])
for (const [key, value] of map) {
    ...
}
```

### 読み込み専用のオブジェクト
オブジェクトにも読み込み専用が同様に存在し、型ユーティリティの`Readonly<>`があります。  
逆に`readonly`は使えないです。
```
type Typename = {
    hoge: Type;
    fuga: Type;
}
const piyo: Readonly<Typename> = {
    hoge: foo,
    fuga: bar
};
```

### 型付け・型命名（重要）
この項を読む前に「変数の定義」、「読み込み専用のオブジェクト」を読んでください。  
さて、**オブジェクトには自作の型をつけてください**。あるかないかでtsにおけるコンパイルチェックに多大な影響を与えます。  
自作の型は`type`宣言か`interface`宣言で作れます。
命名規則として接頭辞は大文字にしてください。
```
type Typename = TYPE;
type Typename = {
    hoge: Type;
    fuga: Type;
}
interface Typename {
    hoge: Type;
    fuga: Type;
}
```
定義された型は変数、関数ともに利用できます。
使い回さないのであれば、個別に定義をしてください。  
実際は型名ではなく中身をチェックするため、別名の型でも通ります。  
関数のレスポンス時にオブジェクトが返される場合、型通りの受け手が必要になります。  
任意のプロパティを`readonly`修飾子で読み込み専用にすることも、キー名の後ろに`?`をつけることで省略することもできます。  
型ユーティリティ`Readonly<>`や`Partial<>`を使えば全てに`readonly`も`?`もつけなくて良くなります。  
ところで、
```
const value: {[key: TYPE]: TYPE} = {
    ...
}
```
とすることで辞書っぽいオブジェクトが使えます。  
これはAPIレスポンスでよく使われるので大事。  
また、型定義に型変数を書くことができます。（入れ子みたいな感じ）  
`any`型は型チェックを放棄します。最終兵器なので使わないように。
代わりに`unknown`型を使いましょう。  
`unknown`型は許可される操作を限定し、メンバアクセス、メソッド呼び出しを行わせず、ランタイムエラーを起こす前にチェックするので、実行時エラーとして扱われます。

### 型ガード
上記で厳しい型付けをしてしまったが、部分的に寛容でありたい場合はtypeofで型の条件分岐するのも手。
型ガード関数は
```
function foo(arg: unknown): arg is TYPE<any> {
    ...
}
```
で定義する。

### 型アサーション
型のキャストする機能(`as TYPE`修飾子)は使用しない。

### 制御構文あれこれ
ifなどの処理には1文でもブロックで閉じること。
短い分岐、またはJSX（TSX？）内であれば三項演算子は使用してよい。(Reactではよく使うよ)  
ループは`for of`を使ってください。
jsでは遅いと評判の`for of`ですが、tsではjsコンパイル時に従来の高速のfor文を生成してくれます。
```
const iterable = ["a", "b", "c"];
for (const value of iterable) {
    ...
}
```
インデックス付きは
```
for (const [index, value] of iterable.entries()) {
    ...
}
```
です。  
無限ループは基本禁止。(多分eslintで弾かれるけど)使うならコメントに残す。

### 関数の定義
React Hooksでコンポーネントを作成するため`const`宣言を使ってください。  
```
const component = (props) => {
    ...
}
```
Hooks内の通常関数やサーバサイドは`function`を使ってください。  
型のアノテーションがあるし変数と区別しやすいので。
```
function foo(arg: TYPE): TYPE {
    return variable;
}

const component = (props) => {
    function bar(arg: TYPE): TYPE {
        ...
    }
}
```
返り値がなければ`void`をTYPEに入れてください。  
デフォルト引数は使用して構いません。  
また引数の変数に接尾語`?`(arg?のように)をつけることでその変数には未定義としてundefinedを認めます。  
ただし、その場合はundefinedにおけるエラーハンドリング的なことをしなければなりません。

### コールバックのある関数
関数の引数に関数を取る場合は
```
function foo(arg: (arg1: TYPE, arg2: TYPE) => TYPE): TYPE {
    ...
}
```
で定義可能。

### 関数を含むオブジェクト
オブジェクトの中に関数を埋め込むことができる。
```
const obj = {
    foo() {
        ...
    },
    _hoge: "hoge",
    get bar() {
        return this._hoge;
    },
    set bar(fuga) {
        this._hoge = fuga;
    }
}
```

### インライン文字列展開
基本的にバッククォートを使ってください。
```
const hoge: TYPE = variable;
console.log(`hoge: ${hoge}`); //こっちを使う
console.log("hoge: " + hoge); //使えるけど使わない
```

### サロゲートペア
1文字を2文字使って表現する絵文字とかをサロゲートペアというが、これらは禁止。  
コーディング規約というよりユーザの制約なので設計では無視していいです。

## まあまあ引っかかるやつ
FAQ的なやつを以下に貼っときます。

### ESLintが鬱陶しい
エラーの吐いているところに
```
... // eslint-disable-line ERRORNAME
または
// eslint-disable-next-line ERRORNAME
...
または
/* eslint-disable ERRORNAME */
...
/* eslint-enable ERRORNAME */
```
で対処する。

### stringリテラルの複数行
複数行にまたがった文字列はバッククォートで表現できます。
それ以外はエラーが出ます。  
また、改行したデータはソースコード上でも改行として見られます。

### JSONのUnexpected token error
JSONには制約があります。  
キーはダブルクォートで括らなければならず、また末尾にはカンマを残してはいけません。  
それが問題でサーバにアクセスした場合に、**Forbiddenのエラーが返ってくる**ことがあります。

### 空オブジェクトの真偽
空オブジェクト(`{}`)の真偽はどうやっても真です。空オブジェクトであることを偽にしたいなら
```
const obj = {}
Object.keys(obj).length // =false objにキーがないのでlengthは0となり偽
```
しかないです。面倒ですね。

### nullは
実はオブジェクト型です。なのでnullの変数にtypeofはobjectが返ってきます。
