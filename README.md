# 家計簿アプリ

## なにができますか

このアプリでできることは以下の通りです。

### 収支の記録（追加・更新・削除）
- 日付・カテゴリ・金額・内容を入力して収入・支出を記録できます。
- 支出カテゴリ：食費、日用品、住居費、交際費、娯楽費、交通費
- 収入カテゴリ：給与、副収入、小遣い
- 登録済みの取引を選択して内容を更新したり削除したりできます。

### カレンダーで確認
- 月単位のカレンダーに各日の収支が表示されます。
- 日付をクリックするとその日の取引一覧と収支合計を確認できます。

### 月次サマリー
- 選択中の月の収入合計・支出合計・残高をヘッダー部に表示します。

### レポートページ（グラフ・テーブル）
- カテゴリ別の円グラフで支出の内訳を視覚的に確認できます。
- 月ごとの収入・支出の棒グラフで推移を把握できます。
- 取引一覧テーブルで全取引を確認・一括削除できます。

### 月の切り替え
- 前後の月に移動してそれぞれのデータを確認できます。

### データの永続化
- Firebase Firestore を利用してデータをクラウドに保存します。ページを閉じても記録が維持されます。

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
