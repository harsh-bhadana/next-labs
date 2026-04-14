// Default for the @modal slot.
// When no modal is intercepted, this ensures the slot returns nothing instead of causing a 404.
export default function ModalDefault() {
  return null;
}
