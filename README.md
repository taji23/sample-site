# サンプルFC 公式サイト（デザインサンプル）

ユースサッカークラブ公式サイトのデザインサンプルです。仕様は [PROJECT_SPEC.md](./PROJECT_SPEC.md)、プロダクトの前提は [PRODUCT.md](./PRODUCT.md) を参照してください。

> クラブ名・人物・試合・記事・企業名はすべて架空です。サイト内のサンプル写真は AI 生成のイメージです（`public/images/photos/provenance.json`）。Instagram欄にはBeholdで連携した投稿が表示されます。

## 使い方

依存パッケージはありません（Node.js 20 以上）。

```bash
npm run build   # src/ → dist/ に静的 HTML を生成
npm run serve   # http://localhost:8000/ で dist/ を確認（python3）
```

- トップページ: `/`
- 下層ページ（クラブ / チーム / 試合 / ニュース / アカデミー / スクール / 入団案内 / 地域 / パートナー / お問い合わせ）: 計 47 ページを生成します。
- デザインシステム一覧: `/styleguide/`（noindex）
- ナビゲーションにあるのにページ未実装の URL は「準備中」ページとして自動生成されます（noindex）。

## Cloudflare Workers へのデプロイ

Workers Builds のビルドコマンドを `npm run build`、デプロイコマンドを `npx wrangler deploy` に設定します。`wrangler.jsonc` は生成された `dist/` を静的アセットとして配信します。設定を変更した場合はリポジトリに反映してから再デプロイしてください。ローカルからデプロイする場合は、設定の `name` を Cloudflare 上の対象 Worker 名に合わせてください。

## 構成

```
src/
├── data/         クラブのデータ（カテゴリー・スクール・スタッフ・選手・試合・ニュース・施設・イベント・FAQ・セレクション・スポンサー・ナビ・写真）
├── components/   HTML を返す再利用コンポーネント
├── pages/        ページ（home / about / teams / matches / news / academy / school / join / community / partners / contact）
├── templates/    BaseLayout（head・メタ）/ PageLayout（ヘッダー・フッター）/ SubPage（下層ページ共通）/ ProgramDetail（カテゴリー・クラスの詳細共通）
├── styles/       tokens → base → layout → components → chrome → home → pages → forms → motion の順に結合
├── client/       ブラウザ用 JS（メニュー・スクロール演出・追従 CTA・絞り込み・試作フォーム）
├── routes.js     ページ一覧（各ページモジュールの routes を集約。重複パスはビルド時にエラー）
└── types.js      データの型定義（JSDoc）
scripts/build.mjs 静的生成スクリプト
public/           フォント・写真・favicon
```

## 編集のポイント

- **年代カテゴリー**: `src/data/categories.js` に 1 件追加するだけで、チーム一覧・詳細ページ（`/teams/<id>/`）・メニュー・パスウェイ・募集状況表・費用表・前後ナビが追従します。
- **スクールのクラス**: `src/data/schools.js` に追加すると、クラス一覧・比較表・詳細ページ（`/school/classes/<id>/`）・料金表・体験申込のプルダウンが追従します。
- **下層ページの追加**: `templates/SubPage.js` に `title` / `lead` / `main` を渡すだけで、ヒーロー・パンくず・セクションナビ・共通 CTA が付きます。
- **フォーム**: 問い合わせ・体験申込は試作です。ブラウザ内で検証と確認表示だけを行い、何も送信・保存しません（画面にもその旨を表示）。`?type=` / `?class=` で初期値を指定できます。
- **選手情報**: 未成年のため、背番号・ポジション・学年・イニシャルのみを掲載しています。
- **色・文字・余白**: `src/styles/tokens.css` に集約。ブランド 7 色以外の色は追加しないでください。
- **写真の差し替え**: `public/images/photos/` に同名・同サイズで置き換えるか、`src/data/images.js` を更新します。
- **SNS / 連絡先**: `src/site.config.js`。URL を空にするとリンクは表示されません。
- **Instagram**: `src/site.config.js` の `instagramWidgetFeedId` に Behold のフィード ID を設定します。空にするとサンプル画像に戻ります。投稿の更新・表示上限は Behold の契約プランに従い、表示には JavaScript と Behold への接続が必要です。YouTube は引き続きサンプルです。
# sample-site
