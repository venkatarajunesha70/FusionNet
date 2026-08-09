type SectionButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function SectionButton({ label, active, onClick }: SectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}
