import { ReactNode } from "react";

export function Table({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-sm ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <tr className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`h-10 px-2 text-left align-middle ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`p-2 align-middle ${className}`}>{children}</td>;
}
