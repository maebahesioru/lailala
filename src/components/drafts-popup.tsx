"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20 md:pt-24"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-muted">
                  <X size={20} />
                </motion.button>
                <h2 className="text-lg font-bold">下書き</h2>
                <span className="text-sm text-muted">{drafts.length}件</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewDraft}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                <Plus size={16} />
                新規作成
              </motion.button>
            </div>

            {/* Drafts list */}
            <div className="max-h-[60vh] overflow-y-auto">
              {drafts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-12 text-center text-muted"
                >
                  <FileText size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-bold mb-1">下書きがありません</p>
                  <p className="text-sm">作成した下書きがここに表示されます</p>
                </motion.div>
              ) : (
                <div className="divide-y divide-border">
                  <AnimatePresence>
                    {drafts.map((draft) => (
                      <motion.div
                        key={draft.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                        className={`p-4 cursor-pointer transition-colors ${activeDraftId === draft.id ? "bg-primary/5" : ""}`}
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
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDraft(draft.id);
                            }}
                            className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
