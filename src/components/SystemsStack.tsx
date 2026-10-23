import { stack, systems } from "../data";

export function Systems() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
      <p className="display max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.12] tracking-[-0.035em] text-balance">
        {systems.statement}
      </p>

      <dl className="border-t border-line">
        {systems.capabilities.map((capability) => (
          <div
            key={capability.name}
            className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="text-base font-medium">{capability.name}</dt>
            <dd className="text-[0.9375rem] leading-relaxed text-muted">{capability.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Stack() {
  return (
    <div className="grid gap-x-20 gap-y-10 sm:grid-cols-2">
      {stack.map((group) => (
        <div key={group.group} className="border-t border-line pt-5">
          <h3 className="text-sm text-muted">{group.group}</h3>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-pretty">
            {group.items.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
