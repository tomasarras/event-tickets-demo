"use client";

export default function BuyerForm({ value, onChange }) {
  function set(field, val) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-slate-900">Datos del comprador</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Nombre</label>
          <input
            type="text"
            required
            value={value.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Apellido</label>
          <input
            type="text"
            required
            value={value.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Documento</label>
          <input
            type="text"
            required
            value={value.document}
            onChange={(e) => set("document", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
          <input
            type="email"
            required
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>
    </div>
  );
}
