import { CheckCircle2 } from 'lucide-react'
export const Toast = ({ message }: { message: string | null }) => message ? (
  <div className="absolute left-1/2 -translate-x-1/2 z-50 bg-textDark/90 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2" style={{ top: 'max(env(safe-area-inset-top),20px)' }}>
    <CheckCircle2 className="w-4 h-4 text-green-400" /><span>{message}</span></div>) : null
export const Confirm = ({ text, ok, cancel }: { text: string; ok: () => void; cancel: () => void }) => (
  <div className="absolute inset-0 z-50 bg-black/30 flex items-center justify-center px-8">
    <div className="bg-bgMain rounded-3xl p-5 w-full text-center shadow-xl"><p className="text-sm mb-5">{text}</p>
      <div className="flex gap-3"><button onClick={cancel} className="flex-1 py-3 rounded-2xl bg-white border border-borderLight text-sm">取消</button>
        <button onClick={ok} className="flex-1 py-3 rounded-2xl bg-[#C9625F] text-white text-sm">刪除</button></div></div></div>
)
