import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

type Service = "pressure" | "window" | "lawn";

export function PriceCalculator() {
  const [service, setService] = useState<Service>("pressure");
  const [sqm, setSqm] = useState(20);
  const [large, setLarge] = useState(0);
  const [medium, setMedium] = useState(0);
  const [small, setSmall] = useState(0);
  const [snow, setSnow] = useState(false);
  const [sanding, setSanding] = useState(false);
  const [shown, setShown] = useState<number | null>(null);

  const total = useMemo(() => {
    try {
      if (service === "pressure") {
        let r = 2.5 + (snow ? 0.5 : 0) + (sanding ? 0.5 : 0);
        return Math.max(0, r * Math.max(0, sqm));
      }
      if (service === "window") {
        return Math.max(0, large * 10 + medium * 5 + small * 2.5);
      }
      return Math.max(0, 0.25 * Math.max(0, sqm));
    } catch (e) {
      console.error('Price calculation error:', e);
      return 0;
    }
  }, [service, sqm, large, medium, small, snow, sanding]);

  const services: { id: Service; label: string }[] = [
    { id: "pressure", label: "Pressure Washing" },
    { id: "window", label: "Window Cleaning" },
    { id: "lawn", label: "Lawn Mowing" },
  ];

  const handleServiceChange = (newService: Service) => {
    setService(newService);
    setShown(null);
  };

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value) || 0;
    setSqm(Math.max(0, value));
  };

  const handleLargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value) || 0;
    setLarge(Math.max(0, value));
  };

  const handleMediumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value) || 0;
    setMedium(Math.max(0, value));
  };

  const handleSmallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value) || 0;
    setSmall(Math.max(0, value));
  };

  const handleCalculate = () => {
    setShown(total);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold">Instant Price Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimate your job in seconds</p>
        </div>
      </div>

      <div className="mb-5">
        <Label className="mb-2 block text-sm font-medium">Select Service</Label>
        <div className="grid grid-cols-3 gap-2">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleServiceChange(s.id)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                service === s.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {(service === "pressure" || service === "lawn") && (
        <div className="mb-5">
          <Label htmlFor="sqm" className="mb-2 block text-sm font-medium">Square Meters</Label>
          <Input 
            id="sqm" 
            type="number" 
            min={0} 
            value={sqm} 
            onChange={handleSqmChange}
          />
        </div>
      )}

      {service === "pressure" && (
        <div className="mb-5 space-y-2 rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium">Add-ons</p>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input 
              type="checkbox" 
              checked={snow} 
              onChange={(e) => setSnow(e.currentTarget.checked)} 
            />
            Stone Snow Washing (+£0.50/sqm)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input 
              type="checkbox" 
              checked={sanding} 
              onChange={(e) => setSanding(e.currentTarget.checked)} 
            />
            Sanding (+£0.50/sqm)
          </label>
        </div>
      )}

      {service === "window" && (
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div>
            <Label className="mb-1 block text-xs">Large (£10)</Label>
            <Input 
              type="number" 
              min={0} 
              value={large} 
              onChange={handleLargeChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Medium (£5)</Label>
            <Input 
              type="number" 
              min={0} 
              value={medium} 
              onChange={handleMediumChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Small (£2.50)</Label>
            <Input 
              type="number" 
              min={0} 
              value={small} 
              onChange={handleSmallChange}
            />
          </div>
        </div>
      )}

      <Button 
        variant="hero" 
        size="lg" 
        className="w-full" 
        onClick={handleCalculate}
        type="button"
      >
        Calculate Price
      </Button>

      <div className="mt-5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated Price</p>
        <p className="mt-1 font-display text-4xl font-bold text-primary">
          £{(shown ?? 0).toFixed(2)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Final price confirmed after a free no-obligation quote.
        </p>
      </div>
    </div>
  );
}
