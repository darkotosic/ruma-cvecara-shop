"use client";

import type { ProductAvailability, ProductFilters } from "@/lib/cms-types";

const availabilityLabels: Record<ProductAvailability, string> = {
  dostupno: "Dostupno odmah",
  nedostupno: "Na upit",
};

type FiltersSidebarProps = {
  filters: ProductFilters;
  priceBounds: { min: number; max: number };
  onChange: (nextFilters: ProductFilters) => void;
  onReset: () => void;
  options: {
    povodi: string[];
    boje: string[];
    tipovi: string[];
    statusi: ProductAvailability[];
  };
};

export default function FiltersSidebar({ filters, priceBounds, onChange, onReset, options }: FiltersSidebarProps) {
  const currentMin = filters.minCena ?? priceBounds.min;
  const currentMax = filters.maxCena ?? priceBounds.max;

  const updateFilter = (key: keyof ProductFilters, value: ProductFilters[keyof ProductFilters]) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <aside className="space-y-6 rounded-3xl bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/60">Filteri</p>
          <h2 className="text-xl font-semibold text-primary-dark">Uredi izbor</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
        >
          Resetuj
        </button>
      </div>

      <div className="space-y-2 rounded-2xl border border-primary-dark/10 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary-dark">Cena</span>
          <span className="text-xs text-primary-dark/60">
            {currentMin.toLocaleString("sr-RS")} - {currentMax.toLocaleString("sr-RS")} RSD
          </span>
        </div>
        <div className="flex gap-3">
          <label className="flex flex-1 flex-col text-xs text-primary-dark/70">
            Min
            <input
              type="number"
              value={currentMin}
              min={priceBounds.min}
              max={currentMax}
              onChange={(event) => updateFilter("minCena", Number(event.target.value))}
              className="mt-1 rounded-lg border border-primary-dark/20 px-3 py-2 text-sm text-primary-dark focus:border-primary focus:outline-none"
            />
          </label>
          <label className="flex flex-1 flex-col text-xs text-primary-dark/70">
            Max
            <input
              type="number"
              value={currentMax}
              min={currentMin}
              max={priceBounds.max}
              onChange={(event) => updateFilter("maxCena", Number(event.target.value))}
              className="mt-1 rounded-lg border border-primary-dark/20 px-3 py-2 text-sm text-primary-dark focus:border-primary focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-primary-dark/10 p-4">
        <p className="text-sm font-semibold text-primary-dark">Povod</p>
        <div className="flex flex-wrap gap-2">
          {options.povodi.map((povod) => {
            const selected = filters.povod === povod;
            return (
              <button
                type="button"
                key={povod}
                onClick={() => updateFilter("povod", selected ? undefined : povod)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-primary-dark text-beige-light shadow"
                    : "bg-beige-dark text-primary-dark hover:bg-primary/20"
                }`}
              >
                {povod}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-primary-dark/10 p-4">
        <p className="text-sm font-semibold text-primary-dark">Boja</p>
        <div className="grid grid-cols-2 gap-2">
          {options.boje.map((boja) => {
            const selected = filters.boja === boja;
            return (
              <button
                type="button"
                key={boja}
                onClick={() => updateFilter("boja", selected ? undefined : boja)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  selected
                    ? "border-primary-dark bg-primary/15 text-primary-dark"
                    : "border-primary-dark/10 bg-beige-dark text-primary-dark hover:border-primary"
                }`}
              >
                {boja}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-primary-dark/10 p-4">
        <p className="text-sm font-semibold text-primary-dark">Tip biljke</p>
        <div className="space-y-2">
          {options.tipovi.map((tip) => {
            const selected = filters.tipBiljke === tip;
            return (
              <label key={tip} className="flex items-center gap-3 text-sm font-semibold text-primary-dark/80">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => updateFilter("tipBiljke", selected ? undefined : tip)}
                  className="h-4 w-4 rounded border-primary-dark/40 text-primary-dark focus:ring-primary"
                />
                {tip}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-primary-dark/10 p-4">
        <p className="text-sm font-semibold text-primary-dark">Dostupnost</p>
        <div className="space-y-2">
          {options.statusi.map((status) => {
            const selected = filters.status === status;
            return (
              <label key={status} className="flex items-center justify-between rounded-xl border border-primary-dark/10 px-3 py-2 text-sm font-semibold text-primary-dark/80">
                <span>{availabilityLabels[status]}</span>
                <input
                  type="radio"
                  name="dostupnost"
                  value={status}
                  checked={selected}
                  onChange={() => updateFilter("status", status)}
                  className="h-4 w-4 border-primary-dark/40 text-primary-dark focus:ring-primary"
                />
              </label>
            );
          })}
          <button
            type="button"
            onClick={() => updateFilter("status", undefined)}
            className="text-xs font-semibold text-primary-dark underline-offset-4 hover:underline"
          >
            Bez filtera dostupnosti
          </button>
        </div>
      </div>
    </aside>
  );
}
