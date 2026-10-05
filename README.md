# 密碼小管家 (password-manager-app)
個人手機密碼管理 Web App：無後端、無帳號，資料只存在手機瀏覽器的 IndexedDB。

## 功能
全部／金融／購物／遊戲／自定義分類，大項目可無限新增、改名、選顏色，太多時可左右滑動、即時搜尋、列表直接顯示帳號與密碼、每筆可新增多個自定義欄位（交易密碼、備註…）、新增／編輯／刪除、複製、Excel 匯出與 iOS 系統分享。

## 技術
React 18、Vite、TypeScript、Tailwind CSS 3、lucide-react、SheetJS (xlsx)、IndexedDB。

## 資料儲存
由 `src/services/db.ts` 存入 IndexedDB（資料庫 `JP_PasswordManager_DB`），不會上傳，也沒有示範資料。資料目前為明文，清除 Safari 網站資料會一併刪除，請定期匯出。

## Excel 匯出
欄位：分類、名稱、帳號、密碼、自定義（所有自定義欄位合併為「標籤：內容」）。「分享檔案」呼叫 Web Share API。

## 啟動
    npm install
    npm run dev
    npm run build

## 部署
Netlify：Build command `npm run build`、Publish directory `dist`。需 HTTPS。iPhone 以 Safari 開啟後「加入主畫面」。
