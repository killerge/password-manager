import * as XLSX from "xlsx";
import type { PasswordItem } from "../types";
import { CATEGORY_LABEL } from "../types";

export function buildWorkbook(items: PasswordItem[]) {
  const rows = items.map((it) => ({
    分類: CATEGORY_LABEL[it.category],
    名稱: it.name,
    帳號: it.account,
    密碼: it.password,
    自定義: it.note,
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [{ wch: 10 }, { wch: 20 }, { wch: 24 }, { wch: 20 }, { wch: 30 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "密碼資料");
  return wb;
}

export function exportToExcelFile(items: PasswordItem[]): { blob: Blob; filename: string } {
  const wb = buildWorkbook(items);
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return { blob, filename: `密碼資料_${stamp}.xlsx` };
}

export async function shareOrDownload(blob: Blob, filename: string): Promise<"shared" | "downloaded"> {
  const file = new File([blob], filename, { type: blob.type });
  const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean; share?: (data: { files: File[]; title?: string }) => Promise<void> };
  if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: filename });
      return "shared";
    } catch {
      // user cancelled or share failed — fall through to download
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return "downloaded";
}
