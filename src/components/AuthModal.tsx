"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isConfigured: boolean;
  onSignIn: (email: string, password: string) => Promise<unknown>;
  onSignUp: (email: string, password: string) => Promise<{ needsEmailConfirmation: boolean }>;
  onSignOut: () => Promise<void>;
}

export default function AuthModal({
  isOpen,
  onClose,
  user,
  isConfigured,
  onSignIn,
  onSignUp,
  onSignOut,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!isConfigured) {
      setError("Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu.");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") {
        await onSignIn(email, password);
        setNotice("Berhasil masuk. Playlist cloud siap digunakan.");
        onClose();
      } else {
        const result = await onSignUp(email, password);
        if (result.needsEmailConfirmation) {
          setNotice("Akun berhasil dibuat. Periksa email untuk konfirmasi sebelum login.");
          setMode("login");
          setPassword("");
          setConfirmPassword("");
        } else {
          setNotice("Akun berhasil dibuat dan sudah masuk.");
          onClose();
        }
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Autentikasi gagal. Silakan coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    setError(null);
    try {
      await onSignOut();
      onClose();
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : "Gagal keluar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111114] p-6 shadow-2xl shadow-black/60"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#22c527]">
              OneMusic Account
            </p>
            <h2 id="auth-modal-title" className="text-xl font-black text-white">
              {user ? "Akun kamu" : mode === "login" ? "Selamat datang kembali" : "Buat akun OneMusic"}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              {user
                ? "Playlist kamu tersimpan dan tersinkronisasi melalui Supabase."
                : "Masuk untuk menyimpan playlist di cloud dan mengaksesnya dari perangkat lain."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#22c527]/15 text-lg font-black text-[#22c527]">
                {(user.email?.[0] || "U").toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">Signed in</p>
                <p className="truncate text-xs text-white/50">{user.email}</p>
              </div>
              <span className="ml-auto h-2 w-2 rounded-full bg-[#22c527] shadow-[0_0_12px_rgba(34,197,39,0.8)]" />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/8 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-400/15 disabled:opacity-50"
            >
              <i className="ri-logout-box-r-line" />
              {busy ? "Memproses..." : "Keluar dari akun"}
            </button>
          </div>
        ) : (
          <>
            {!isConfigured && (
              <div className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/8 p-3 text-xs leading-relaxed text-amber-100">
                Supabase belum dikonfigurasi. Mode guest tetap bisa membuat playlist lokal, tetapi sinkronisasi akun membutuhkan konfigurasi Supabase.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-white/65">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#22c527]/60 focus:ring-2 focus:ring-[#22c527]/10"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-white/65">Password</span>
                <input
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#22c527]/60 focus:ring-2 focus:ring-[#22c527]/10"
                />
              </label>
              {mode === "register" && (
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-white/65">Konfirmasi password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Ulangi password"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#22c527]/60 focus:ring-2 focus:ring-[#22c527]/10"
                  />
                </label>
              )}

              {error && (
                <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-xs leading-relaxed text-red-200">
                  {error}
                </p>
              )}
              {notice && (
                <p role="status" className="rounded-xl border border-[#22c527]/20 bg-[#22c527]/8 p-3 text-xs leading-relaxed text-[#b9f7bb]">
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={busy || !isConfigured}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#22c527] px-4 py-3 text-sm font-black text-black shadow-lg shadow-[#22c527]/15 transition hover:bg-[#32d638] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? "Memproses..." : mode === "login" ? "Masuk" : "Buat akun"}
                <i className="ri-arrow-right-line" />
              </button>
            </form>
            <div className="mt-5 text-center text-xs text-white/45">
              {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError(null);
                  setNotice(null);
                }}
                className="font-bold text-[#22c527] transition hover:text-white"
              >
                {mode === "login" ? "Daftar sekarang" : "Masuk"}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
