// Simple utility function for merging class names
type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: boolean | undefined | null };

function toValue(mix: ClassValue): string {
  if (typeof mix === 'string' || typeof mix === 'number') {
    return String(mix);
  }

  if (typeof mix === 'boolean' || mix == null) {
    return '';
  }

  if (Array.isArray(mix)) {
    return mix.map(toValue).filter(Boolean).join(' ');
  }

  if (typeof mix === 'object') {
    return Object.keys(mix)
      .filter((key) => mix[key])
      .join(' ');
  }

  return '';
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(toValue).filter(Boolean).join(' ');
}

export type { ClassValue };
