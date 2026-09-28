"use client";

import { useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CityOption = { ref: string; cityRef: string; label: string };
type WarehouseOption = { ref: string; label: string };

export function NovaPoshtaFields() {
  const t = useTranslations("checkout");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [cityQuery, setCityQuery] = useState("");
  const [cityLabel, setCityLabel] = useState("");
  const [cityRef, setCityRef] = useState("");
  const [cities, setCities] = useState<CityOption[]>([]);
  const [warehouseQuery, setWarehouseQuery] = useState("");
  const [warehouseLabel, setWarehouseLabel] = useState("");
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/nova-poshta/cities?q=ки")
      .then((res) => {
        setConfigured(res.status !== 503);
      })
      .catch(() => setConfigured(false));
  }, []);

  useEffect(() => {
    if (configured === false) return;
    if (cityQuery.trim().length < 2) {
      setCities([]);
      return;
    }
    const timer = setTimeout(() => {
      startTransition(async () => {
        const res = await fetch(
          `/api/nova-poshta/cities?q=${encodeURIComponent(cityQuery.trim())}`,
        );
        if (res.status === 503) {
          setConfigured(false);
          return;
        }
        const data = (await res.json()) as {
          configured: boolean;
          cities: CityOption[];
        };
        setConfigured(data.configured);
        setCities(data.cities ?? []);
      });
    }, 280);
    return () => clearTimeout(timer);
  }, [cityQuery, configured]);

  useEffect(() => {
    if (!cityRef || configured === false) {
      setWarehouses([]);
      return;
    }
    const timer = setTimeout(() => {
      startTransition(async () => {
        const params = new URLSearchParams({ cityRef });
        if (warehouseQuery.trim()) params.set("q", warehouseQuery.trim());
        const res = await fetch(`/api/nova-poshta/warehouses?${params}`);
        if (!res.ok) return;
        const data = (await res.json()) as { warehouses: WarehouseOption[] };
        setWarehouses(data.warehouses ?? []);
      });
    }, 280);
    return () => clearTimeout(timer);
  }, [cityRef, warehouseQuery, configured]);

  if (configured === false) {
    return (
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ManualField name="city" label={t("city")} required />
        <ManualField
          name="address"
          label={t("novaPoshtaBranch")}
          required
          className="sm:col-span-2"
          placeholder={t("novaPoshtaBranchPlaceholder")}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="relative sm:col-span-2">
        <Label htmlFor="city-search">{t("city")}</Label>
        <Input
          id="city-search"
          value={cityQuery || cityLabel}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setCityLabel("");
            setCityRef("");
            setWarehouseLabel("");
            setWarehouseQuery("");
          }}
          required={!cityLabel}
          autoComplete="off"
          placeholder={t("cityPlaceholder")}
          className="mt-2 h-11 rounded-none"
        />
        <input type="hidden" name="city" value={cityLabel} required />
        <input type="hidden" name="postal" value={cityRef} />
        {cities.length > 0 && !cityLabel && (
          <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto border border-border bg-beige shadow-sm">
            {cities.map((city) => (
              <li key={city.ref}>
                <button
                  type="button"
                  className="w-full cursor-pointer px-3 py-2.5 text-left text-sm hover:bg-beige-deep/60"
                  onClick={() => {
                    setCityLabel(city.label);
                    setCityQuery(city.label);
                    setCityRef(city.cityRef);
                    setCities([]);
                  }}
                >
                  {city.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </label>

      <label className="relative sm:col-span-2">
        <Label htmlFor="warehouse-search">{t("novaPoshtaBranch")}</Label>
        <Input
          id="warehouse-search"
          value={warehouseQuery || warehouseLabel}
          onChange={(e) => {
            setWarehouseQuery(e.target.value);
            setWarehouseLabel("");
          }}
          required={!warehouseLabel}
          disabled={!cityRef}
          autoComplete="off"
          placeholder={t("novaPoshtaBranchPlaceholder")}
          className="mt-2 h-11 rounded-none"
        />
        <input type="hidden" name="address" value={warehouseLabel} required />
        {warehouses.length > 0 && !warehouseLabel && (
          <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto border border-border bg-beige shadow-sm">
            {warehouses.map((wh) => (
              <li key={wh.ref}>
                <button
                  type="button"
                  className="w-full cursor-pointer px-3 py-2.5 text-left text-sm hover:bg-beige-deep/60"
                  onClick={() => {
                    setWarehouseLabel(wh.label);
                    setWarehouseQuery(wh.label);
                    setWarehouses([]);
                  }}
                >
                  {wh.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {pending && (
          <p className="mt-1 text-[11px] text-muted-foreground">{t("npLoading")}</p>
        )}
      </label>
    </div>
  );
}

function ManualField({
  name,
  label,
  required,
  className,
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-11 rounded-none"
      />
    </label>
  );
}
