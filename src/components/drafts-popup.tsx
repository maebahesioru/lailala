"use client";

import { useState, useEffect } from "react";
import { X, FileText, Trash2, Plus } from "lucide-react";

interface Draft {
  id: string;
  text: string;
  updatedAt: number;
}

interface DraftsPopupProps {
  open: boolean;
  onClose: () => void;
  onSelect: (draft: Draft) => void;
  onNewDraft: () => void;
  activeDraftId: string | null;
}

function loadDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem("lailala-drafts");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDrafts(list: Draft[]) {
  localStorage.setItem("lailala-drafts", JSON.stringify(list));
}

export function DraftsPopup({ open, onClose, onSelect, onNewDraft, activeDraftId }: DraftsPopupProps) {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    if (open) {
      setDrafts(loadDrafts());
    }
  }, [open]);

  const deleteDraft = (id: string) => {
    const updated = loadDrafts().filter((d) => d.id !== id);
    saveDrafts(updated);
    setDrafts(updated);
  };

  const handleSelect = (draft: Draft) => {
    onSelect(draft);
    onClose();
  };

  const handleNewDraft = () => {
    onNewDraft();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20 md:pt-24" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-muted">
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold">下書き</h2>
            <span className="text-sm text-muted">{drafts.length}件</span>
          </div>
          <button
            onClick={handleNewDraft}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-hover transition-colors"
          >
            <Plus size={16} />
            新規作成
          </button>
        </div>

        {/* Drafts list */}
        <div className="max-h-[60vh] overflow-y-auto">
          {drafts.length === 0 ? (
            <div className="p-12 text-center text-muted">
              <FileText size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-lg font-bold mb-1">下書きがありません</p>
              <p className="text-sm">作成した下書きがここに表示されます</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className={`p-4 hover:bg-white/[0.03] transition-colors cursor-pointer ${activeDraftId === draft.id ? "bg-primary/5" : ""}`}
                  onClick={() => handleSelect(draft)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] leading-snug whitespace-pre-wrap line-clamp-3">
                        {draft.text.trim() || <span className="text-muted italic">（無題）</span>}
                      </p>
                      <p className="text-[13px] text-muted mt-2">
                        {new Date(draft.updatedAt).toLocaleString("ja-JP", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDraft(draft.id);
                      }}
                      className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
