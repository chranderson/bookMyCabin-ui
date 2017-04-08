export function getToday() {
  const date = new Date();
  return `${date.toLocaleDateString().slice(0, -5)}/${date.toLocaleDateString().slice(-2)}`;
}

// export default function formatDate() {
//   const date = new Date();
//   return `${date.toLocaleDateString().slice(0, -5)}/${date.toLocaleDateString().slice(-2)}`;
// }
