import * as XLSX from 'xlsx'
import { PasswordItem } from '../types/password'
import { catOf, fieldsText } from '../utils/category'
const MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const name = () => `密碼小管家_備份_${new Date().toISOString().slice(0, 10)}.xlsx`
function build(items: PasswordItem[]) {
  const ws = XLSX.utils.json_to_sheet(items.map(i => ({ 分類: catOf(i.category).name, 名稱: i.title, 帳號: i.account, 密碼: i.password, 自定義: fieldsText(i.customFields) })), { header: ['分類', '名稱', '帳號', '密碼', '自定義'] })
  ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 25 }, { wch: 25 }, { wch: 36 }]
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, '密碼備份'); return wb
}
const blob = (i: PasswordItem[]) => new Blob([XLSX.write(build(i), { bookType: 'xlsx', type: 'array' })], { type: MIME })
export const exportToExcel = (i: PasswordItem[]) => XLSX.writeFile(build(i), name())
/** 呼叫 iOS 系統分享（存到檔案／AirDrop／Email）。不支援時回傳 false */
export async function shareExcel(i: PasswordItem[]) {
  const f = new File([blob(i)], name(), { type: MIME })
  if (!navigator.canShare?.({ files: [f] })) return false
  try { await navigator.share({ files: [f], title: '密碼備份' }) } catch { /* 使用者取消 */ }
  return true
}
