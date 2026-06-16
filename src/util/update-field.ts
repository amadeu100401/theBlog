function updateField<K extends keyof PublicPost>(
  key: K,
  value: React.SetStateAction<PublicPost[K]>,
) {
  setForm(prev => {
    const resolved =
      typeof value === 'function'
        ? (value as (prev: PublicPost[K]) => PublicPost[K])(prev[key])
        : value;

    return {
      ...prev,
      [key]: resolved,
    };
  });
}
