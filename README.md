# jl.css

セマンティックなHTML要素そのものにデザインを適用するCSSライブラリーです。

## 開始

1.  HTMLの`<head>`内で読み込みます。
    ```html
    <link rel="stylesheet" href="jl.css">
1.  `:root`のCSS変数を上書きするだけでカスタマイズできます。
    ```html
    <style>
      :root {
        /* カラー */
        /* 内部で適切なトーンを自動計算します */

        /* 背景 */
        --jl-palette-primary: #bf1e33;

        /* アクセント */
        --jl-palette-secondary: #0067c0;
        --jl-palette-tertiary: #eb97a8;

        /* タイポグラフィー */

        /*
          既定のフォント（「M PLUS 1」や「Noto Emoji」）を使用する場合は、
          事前にGoogle Fonts等で読み込んでください。
         */
        --jl-typeface-brand: var(--jl-typeface-plain);
        --jl-typeface-plain: 'M PLUS 1', 'Noto Emoji', sans-serif;
        --jl-typeface-mono: 'M PLUS 1 Code', 'M PLUS 1', 'Noto Emoji', monospace;

        /* 文字の太さ */
        --jl-typeface-weight-regular: 400;
        --jl-typeface-weight-medium: 700;
        --jl-typeface-weight-bold: 900;
      }
    </style>
    ```

## 機能

現在は一部の要素に対応しています。

-   `br`
-   `code`
-   [`details`](#details要素)
-   [`h1`から`h6`まで](#h1要素からh6要素まで)
-   `pre`

### `details`要素

開閉状態に応じて、以下のアイコンが切り替わります。

```css
:root {
  --jl-disclosure-icon-content-closed: '▼';
  --jl-disclosure-icon-content-opened: '▲';
}
```

### `h1`要素から`h6`要素まで

`h5`要素と`h6`要素の装飾のバランスを微調整したい場合は、以下のようにCSS変数を上書きしてください。

```css
:root {
  --jl-heading-chip-inset-block-end: var(--jl-type-leading-half);
}
